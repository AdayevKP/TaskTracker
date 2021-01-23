from flask import jsonify, make_response
from flask_restful import abort


def response(status_code, data=None, message=''):
    body = jsonify(
            data=data,
            message=message,
            status=status_code)

    return make_response(body, status_code)


def error(status_code, message=''):
    abort(status_code, message=message, status=status_code)
