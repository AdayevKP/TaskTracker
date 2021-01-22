from collections import namedtuple
from flask import jsonify, g
from flask_restful import Resource, reqparse, abort

from app.auth import encode_token, decode_token, token_auth, multi_auth, basic_auth
from database import db
from app.models import UserModel

user_info_parser = reqparse.RequestParser()
user_info_parser.add_argument('username')
user_info_parser.add_argument('password')
UserInfo = namedtuple('UserInfo', 'username password')


class Token(Resource):
    @basic_auth.login_required
    def get(self):
        usr = basic_auth.current_user()
        return jsonify({'token': encode_token(usr.as_dict())})


class User(Resource):
    @staticmethod
    def post():
        body = UserInfo(**user_info_parser.parse_args())
        if UserModel.query.filter_by(username=body.username).first():
            abort('User with this name already exists')

        user = UserModel(name=body.username, password=body.password)
        db.session.add(user)
        db.session.commit()
        return jsonify({'data': user.as_dict(),
                        'token': encode_token(user.as_dict())})

    @token_auth.login_required
    def get(self):
        user = token_auth.current_user()
        return jsonify({'data': user.as_dict()})

    @token_auth.login_required
    def delete(self):
        user = token_auth.current_user()
        db.session.delete(user)
        db.session.commit()
        return jsonify({'message': 'user deleted'})
