from collections import namedtuple
from flask_restful import Resource, reqparse
from flask_api import status

from app.auth import token_auth
from database import db
from app.models import TaskModel, UserModel
from app.response import response, raise_error_response


task_info_parser = reqparse.RequestParser()
task_info_parser.add_argument('name', required=True)
task_info_parser.add_argument('color', required=True)
TaskInfo = namedtuple('TaskInfo', 'name color')


def get_task_info():
    return TaskInfo(**task_info_parser.parse_args())


class Tasks(Resource):
    @token_auth.login_required
    def put(self):
        body = get_task_info()
        user = token_auth.current_user()

        if TaskModel.query.filter_by(name=body.name, user_id=user.id).first():
            return response(status_code=status.HTTP_409_CONFLICT, message='Task with this name already exists')

        task = TaskModel(name=body.name, color=body.color, user=user)

        db.session.add(task)
        db.session.commit()

        return response(status_code=status.HTTP_201_CREATED, data=task.as_dict())

    @token_auth.login_required
    def get(self):
        user = token_auth.current_user()  # type: UserModel
        tasks = TaskModel.query.filter_by(user_id=user.id)

        return response(
            status_code=status.HTTP_200_OK,
            data=[t.as_dict() for t in tasks])


class Task(Resource):
    @staticmethod
    def try_find_task(task_id, user):
        task = TaskModel.query.get(task_id)  # type: TaskModel

        if not task:
            raise_error_response(
                status_code=status.HTTP_404_NOT_FOUND,
                message='No task with such id')

        if task.user_id != user.id:
            raise_error_response(
                status_code=status.HTTP_403_FORBIDDEN,
                message='Task with this id does not belong to current user')

        return task

    @token_auth.login_required
    def delete(self, task_id):
        user = token_auth.current_user()  # type: UserModel
        task = self.try_find_task(task_id, user)

        db.session.delete(task)
        db.session.commit()

        return response(status_code=status.HTTP_200_OK, message='Task: {} deleted'.format(task.name))


