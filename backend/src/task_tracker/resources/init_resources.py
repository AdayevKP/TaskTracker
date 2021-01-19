from task_tracker.com import api
from task_tracker.resources.user import User


def init_resources():
    api.add_resource(User, '/user')
