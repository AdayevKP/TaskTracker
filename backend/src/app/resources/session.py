import dateparser
from datetime import datetime, date
from collections import namedtuple
from flask_restful import Resource, reqparse
from flask_api import status

from app.auth import token_auth
from database import db
from app.models import TaskModel, UserModel, SessionModel
from app.response import response, raise_error_response

sessions_request_parser = reqparse.RequestParser()
sessions_request_parser.add_argument('begin_date', default='')
sessions_request_parser.add_argument('end_date', default='')
SessionsRequest = namedtuple('SessionsRequest', 'begin_date end_date')

session_edit_request_parser = reqparse.RequestParser()
session_edit_request_parser.add_argument('start', default='')
session_edit_request_parser.add_argument('end', default='')
SessionEditRequest = namedtuple('SessionEditRequest', 'start end')


def get_session_request():
    return SessionsRequest(**sessions_request_parser.parse_args())


def get_session_edit_request():
    return SessionEditRequest(**session_edit_request_parser.parse_args())


class Sessions(Resource):
    @token_auth.login_required
    def get(self):
        user = token_auth.current_user()  # type: UserModel
        body = get_session_request()

        end_date = dateparser.parse(body.end_date) or date.max
        start_date = dateparser.parse(body.begin_date) or date.min

        sessions = db.session.query(SessionModel).join(TaskModel)\
            .filter(
                TaskModel.user_id == user.id,
                SessionModel.start >= start_date.strftime('%Y-%m-%d'),
                SessionModel.start <= end_date.strftime('%Y-%m-%d')).all()

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
        body = get_session_edit_request()

        session = self.try_find_session(session_id, user)

        session.end = dateparser.parse(body.end) if body.end else session.end
        session.start = dateparser.parse(body.start) if body.start else session.start

        db.session.commit()
        return response(
            status_code=status.HTTP_202_ACCEPTED,
            message='Session edited',
            data=session.as_dict())

    @token_auth.login_required
    def delete(self, session_id):
        user = token_auth.current_user()  # type: UserModel
        session = self.try_find_session(session_id, user)

        db.session.delete(session)
        db.session.commit()

        return response(status_code=status.HTTP_200_OK, message='Session: {} deleted'.format(session.name))


