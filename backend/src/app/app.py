import sys
import logging

from flask import Flask
from sqlalchemy_utils import database_exists

from database import db
from app.api_v1 import init_api


APP_NAME = 'server'

_log = logging.getLogger(APP_NAME)

_log.setLevel(logging.DEBUG)
handler = logging.StreamHandler(sys.stdout)
handler.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
handler.setFormatter(formatter)
_log.addHandler(handler)


def create_app():
    new_app = Flask(__name__)

    new_app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.sqlite'
    new_app.config['SECRET_KEY'] = 'super secret key'

    init_api(new_app)
    db.init_app(new_app)

    if not database_exists(new_app.config['SQLALCHEMY_DATABASE_URI']):
        with new_app.app_context():
            # noinspection PyUnresolvedReferences
            import app.models  # this import need to create tables in db from models
            db.create_all()

    return new_app
