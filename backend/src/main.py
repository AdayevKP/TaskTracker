"""
run server

Usage:
    server [--host HOST] [--port PORT] [--debug]
    server --help | -h

Options:
    --debug                      Run in debug mode
    --port PORT                  Port for server
    --host HOST                  Host for server
    --help                       Show this message
"""
import docopt
from app import create_app


def run(opts):
    app = create_app()
    app.run(debug=opts['--debug'], host=opts['--host'], port=opts['--port'])


if __name__ == "__main__":
    run(docopt.docopt(__doc__))
