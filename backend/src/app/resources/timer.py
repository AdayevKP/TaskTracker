import datetime
from collections import namedtuple
from flask_restful import Resource, reqparse
from flask_api import status

from app.auth import token_auth
from database import db
from app.models import TaskModel, UserModel, SessionModel
from app.response import response, raise_error_response
from app.resources import Task

timer_request_parser = reqparse.RequestParser()
timer_request_parser.add_argument('task_id', required=True)
timer_request_parser.add_argument('action', required=True)
TimerRequest = namedtuple('TimerRequest', 'task_id action')


def get_request_info():
    return TimerRequest(**timer_request_parser.parse_args())


class Timer(Resource):
    START = 'start'
    STOP = 'stop'

    @staticmethod
    def _stop_timer(task):
        session = task.sessions.filter_by(end=None).first()

        if session.active():
            session.end = datetime.datetime.now()
            db.session.commit()
            return True

        return False

    def start_timer(self, task: TaskModel):
        self._stop_timer(task)
        session = SessionModel(task_id=task.id)

        db.session.add(session)
        db.session.commit()

        return response(status_code=status.HTTP_200_OK, data=session.as_dict())

    def stop_timer(self, task: TaskModel):
        if not self._stop_timer(task):
            return response(status_code=status.HTTP_200_OK, message='timer already stopped')

        return response(status_code=status.HTTP_202_ACCEPTED, message='Session stopped')

    @token_auth.login_required
    def put(self, task_id):
        body = get_request_info()
        user = token_auth.current_user()
        task = Task.try_find_task(task_id, user)

        if body.action == self.START:
            return self.start_timer(task)

        if body.action == self.STOP:
            return self.stop_timer(task)


