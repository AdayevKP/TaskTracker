import datetime
from collections import namedtuple
from flask_restful import Resource, reqparse
from flask_api import status

from app.auth import token_auth
from database import db
from app.models import TaskModel, UserModel, SessionModel
from app.response import response, raise_error_response
from app.resources import Task


session_info_parser = reqparse.RequestParser()
session_info_parser.add_argument('task_id', required=True)
SessionInfo = namedtuple('SessionInfo', 'task_id')


def get_task_info():
    return SessionInfo(**session_info_parser.parse_args())


class Sessions(Resource):
    @token_auth.login_required
    def get(self):
        user = token_auth.current_user()  # type: UserModel
        sessions = db.session.query(SessionModel).join(TaskModel).filter(TaskModel.user_id == user.id)

        return response(
            status_code=status.HTTP_200_OK,
            data=[s.as_dict() for s in sessions])


class Session(Resource):
    @staticmethod
    def try_find_session(session_id, user):
        session = SessionModel.query.get(session_id)  # type: SessionModel

        if not session:
            raise_error_response(
                status_code=status.HTTP_404_NOT_FOUND,
                message='No session with such id')

        if TaskModel.query.get(session.task_id).user_id != user.id:
            raise_error_response(
                status_code=status.HTTP_403_FORBIDDEN,
                message='Session with this id does not belong to current user')

        return session
    
    @token_auth.login_required
    def patch(self, session_id):
        user = token_auth.current_user()  # type: UserModel

        session = self.try_find_session(session_id, user)
        if not session.active():
            raise_error_response(status_code=status.HTTP_403_FORBIDDEN, message='session already stopped')

        session.end = datetime.datetime.now()

        db.session.commit()
        return response(status_code=status.HTTP_202_ACCEPTED, message='Session stopped'.format(session))

    @token_auth.login_required
    def delete(self, session_id):
        user = token_auth.current_user()  # type: UserModel
        session = self.try_find_session(session_id, user)

        db.session.delete(session)
        db.session.commit()

        return response(status_code=status.HTTP_200_OK, message='Session: {} deleted'.format(session.name))


