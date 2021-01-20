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
from app import create_app


def run(opts):
    app = create_app()
    app.run(debug=opts['--debug'])


if __name__ == "__main__":
    run(docopt.docopt(__doc__))
