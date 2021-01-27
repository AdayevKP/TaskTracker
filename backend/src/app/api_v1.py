from flask import Flask
from flask_restful import Api

from app import resources as res


def init_api(app: Flask):
    api = Api(app)

    api.add_resource(res.User, '/api/v1/user')
    api.add_resource(res.Token, '/api/v1/login')

    api.add_resource(res.Tasks, '/api/v1/tasks')
    api.add_resource(res.Task, '/api/v1/task/<int:task_id>')

    api.add_resource(res.Sessions, '/api/v1/sessions')
    api.add_resource(res.Session, '/api/v1/session/<int:session_id>')
    return api
