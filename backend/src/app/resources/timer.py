from collections import namedtuple
from flask_restful import Resource, reqparse
from flask_api import status

from app.auth import token_auth
from app.models import TaskModel
from app.response import response
from app.resources import Task

timer_request_parser = reqparse.RequestParser()
timer_request_parser.add_argument('action', required=True)
TimerRequest = namedtuple('TimerRequest', 'action')


def get_request_info():
    return TimerRequest(**timer_request_parser.parse_args())


class Timer(Resource):
    START = 'start'
    STOP = 'stop'

    @token_auth.login_required
    def put(self, task_id):
        body = get_request_info()
        user = token_auth.current_user()
        task: TaskModel = Task.try_find_task(task_id, user)

        if body.action == self.START:
            task.start_timer()
            return response(status_code=status.HTTP_202_ACCEPTED, message='Timer for task "{}" started'.format(task.name))

        if body.action == self.STOP:
            if not task.active:
                return response(
                    status_code=status.HTTP_200_OK,
                    message='Timer for task "{}" not active'.format(task.name))

            task.stop_timer()
            return response(status_code=status.HTTP_202_ACCEPTED, message='Timer for task "{}" stopped'.format(task.name))


