from collections import namedtuple
from flask_restful import Resource, reqparse
from flask_api import status

from app.auth import encode_token, token_auth, basic_auth
from database import db
from app.models import UserModel
from app.response import response


user_info_parser = reqparse.RequestParser()
user_info_parser.add_argument('username', required=True)
user_info_parser.add_argument('password', required=True)
UserInfo = namedtuple('UserInfo', 'username password')

TOKEN = 'token'


def get_user_info():
    return UserInfo(**user_info_parser.parse_args())


class Token(Resource):
    @basic_auth.login_required
    def post(self):
        usr = basic_auth.current_user()
        return response(status_code=status.HTTP_202_ACCEPTED, data={TOKEN: encode_token(usr.as_dict())})


class User(Resource):
    @staticmethod
    def post():
        body = get_user_info()
        if UserModel.query.filter_by(username=body.username).first():
            return response(status_code=status.HTTP_409_CONFLICT, message='User with this name already exists')

        user = UserModel(name=body.username, password=body.password)
        db.session.add(user)
        db.session.commit()

        data = user.as_dict()
        data[TOKEN] = encode_token(user.as_dict())

        return response(status_code=status.HTTP_200_OK, data=data, message='Successfully registered')

    @token_auth.login_required
    def get(self):
        user = token_auth.current_user()
        return response(status_code=status.HTTP_200_OK, data=user.as_dict())

    @token_auth.login_required
    def delete(self):
        user = token_auth.current_user()
        db.session.delete(user)
        db.session.commit()
        return response(status_code=status.HTTP_200_OK, message='User: {} deleted'.format(user.username))
