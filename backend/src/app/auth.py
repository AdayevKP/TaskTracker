import jwt
from flask_api import status
from flask_restful import abort

from flask_httpauth import HTTPTokenAuth, HTTPBasicAuth, MultiAuth

from app.models import UserModel

ALGORITHM = 'HS256'
SECRET_KEY = 'super secret key'

token_auth = HTTPTokenAuth(scheme='Bearer')
basic_auth = HTTPBasicAuth()
multi_auth = MultiAuth(token_auth, basic_auth)


def encode_token(data):
    return jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)


def decode_token(token):
    return jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])


@token_auth.verify_token
def verify_token(token):
    if not token:
        return

    try:
        data = decode_token(token)
    except jwt.DecodeError:
        abort('Invalid token')

    return UserModel.query.get(data['id'])


@basic_auth.verify_password
def verify_password(username, password):
    user = UserModel.query.filter_by(username=username).first()  # type: UserModel
    if not user or not user.check_password(password):
        abort('Invalid login or password')

    return user
