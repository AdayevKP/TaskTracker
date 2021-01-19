"""
run server

Usage:
    server [--debug]
    server --help | -h

Options:
    -d --debug                      Run in debug mode
    -h --help                       Show this message
"""
import docopt
import logging

from sqlalchemy_utils import database_exists, create_database

from task_tracker.com import APP_NAME, app, db
from task_tracker.resources.init_resources import init_resources


_log = logging.getLogger(APP_NAME)


def run(opts):
    if not database_exists(app.config['SQLALCHEMY_DATABASE_URI']):
        create_database(app.config['SQLALCHEMY_DATABASE_URI'])
        db.create_all()
        _log.info("database created")

    init_resources()

    app.run(debug=opts['--debug'])


if __name__ == "__main__":
    run(docopt.docopt(__doc__))
