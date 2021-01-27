import jwt
from flask_api import status

from flask_httpauth import HTTPTokenAuth, HTTPBasicAuth, MultiAuth

from app.models import UserModel
from app.response import raise_error_response

ALGORITHM = 'HS256'
SECRET_KEY = 'super secret key 1234'

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
        raise_error_response(status.HTTP_401_UNAUTHORIZED, message='Unauthorized access')

    try:
        data = decode_token(token)
    except jwt.DecodeError:
        raise_error_response(status.HTTP_400_BAD_REQUEST, message='Invalid token')

    user = UserModel.query.get(data['id'])
    if not user:
        raise_error_response(status.HTTP_404_NOT_FOUND, message='Cannot find user for this token')

    return user


@basic_auth.verify_password
def verify_password(username, password):
    user = UserModel.query.filter_by(username=username).first()  # type: UserModel

    if not user or not user.check_password(password):
        raise_error_response(status.HTTP_401_UNAUTHORIZED, message='Invalid username or password')

    return user
