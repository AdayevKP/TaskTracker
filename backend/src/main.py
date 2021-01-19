"""
run server

Usage:
    server [--debug]
    server --help | -h

Options:
    -d --debug                      Run in debug mode
    -h --help                       Show this message
"""
import sys
import docopt
import logging

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_utils import database_exists, create_database

APP_NAME = 'server'

_log = logging.getLogger(APP_NAME)

# from flask_restful import Api

_log.setLevel(logging.DEBUG)
handler = logging.StreamHandler(sys.stdout)
handler.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
handler.setFormatter(formatter)
_log.addHandler(handler)


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.sqlite'
db = SQLAlchemy(app)


def run(opts):
    if not database_exists(app.config['SQLALCHEMY_DATABASE_URI']):
        create_database(app.config['SQLALCHEMY_DATABASE_URI'])
        _log.info("database created")

    app.run(debug=opts['--debug'])


if __name__ == "__main__":
    run(docopt.docopt(__doc__))
