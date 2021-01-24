from collections import namedtuple
from flask_restful import Resource, reqparse
from flask_api import status

from app.auth import token_auth
from database import db
from app.models import TaskModel, UserModel
from app.response import response


task_info_parser = reqparse.RequestParser()
task_info_parser.add_argument('name')
task_info_parser.add_argument('color')
TaskInfo = namedtuple('TaskInfo', 'name color')


def get_task_info():
    return TaskInfo(**task_info_parser.parse_args())


class Tasks(Resource):
    @token_auth.login_required
    def put(self):
        body = get_task_info()
        user = token_auth.current_user()

        if TaskModel.query.filter_by(username=body.name).first():
            return response(status_code=status.HTTP_409_CONFLICT, message='Task with this name already exists')

        task = TaskModel(name=body.name, color=body.color, user=user)

        db.session.add(task)
        db.session.commit()

        return response(status_code=status.HTTP_201_CREATED, data=task.as_dict(), message='New task created')

    @token_auth.login_required
    def get(self):
        user = token_auth.current_user()  # type: UserModel
        tasks = TaskModel.query.filter_by(user_id=user.id)

        return response(
            status_code=status.HTTP_200_OK,
            data=[t.as_dict() for t in tasks])


class Task(Resource):
    @token_auth.login_required
    def delete(self, task_id):
        user = token_auth.current_user()  # type: UserModel
        task = TaskModel.query.get(task_id)  # type: TaskModel

        if not task:
            return response(
                status_code=status.HTTP_404_NOT_FOUND,
                message='Not task with such id')

        if task.user_id != user.id:
            return response(
                status_code=status.HTTP_403_FORBIDDEN,
                message='Task with this id does not belong to current user')

        db.session.delete(task)
        db.session.commit()

        return response(status_code=status.HTTP_200_OK, message='Task: {} deleted'.format(task.name))


