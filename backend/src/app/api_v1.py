from flask import Flask
from flask_restful import Api

from app.resources import User, Token


def init_api(app: Flask):
    api = Api(app)

    api.add_resource(User, '/api/v1/user')
    api.add_resource(Token, '/api/v1/login')
    return api
