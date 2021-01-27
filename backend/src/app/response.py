from flask import jsonify, make_response
from flask_restful import abort


def response(status_code, data=None, message=''):
    body = jsonify(
            data=data,
            message=message,
            status=status_code)

    return make_response(body, status_code)


def raise_error_response(status_code, message='', data=''):
    abort(status_code, message=message, status=status_code, data=data)


