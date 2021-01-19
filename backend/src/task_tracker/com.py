import sys
import logging

from flask import Flask
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy

from task_tracker.fwd_declaration_sql_auto import SQL

APP_NAME = 'server'

_log = logging.getLogger(APP_NAME)

_log.setLevel(logging.DEBUG)
handler = logging.StreamHandler(sys.stdout)
handler.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
handler.setFormatter(formatter)
_log.addHandler(handler)


app = Flask(__name__)
api = Api(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.sqlite'

db = SQLAlchemy(app)  # type: SQL
