import sys
import logging

from flask import Flask
from flask_restful import Api

from database import db
from app.resources.user import User


APP_NAME = 'server'

_log = logging.getLogger(APP_NAME)

_log.setLevel(logging.DEBUG)
handler = logging.StreamHandler(sys.stdout)
handler.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
handler.setFormatter(formatter)
_log.addHandler(handler)


def init_api(app: Flask):
    api = Api(app)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.sqlite'

    api.add_resource(User, '/user')
    return api


def create_app():
    app = Flask(__name__)
    init_api(app)
    db.init_app(app)

    with app.app_context():
        db.create_all()

    return app
