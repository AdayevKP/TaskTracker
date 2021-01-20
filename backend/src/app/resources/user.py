from flask_restful import Resource
from app.models.user_model import UserModel


class User(Resource):
    def get(self):
        return {"data": UserModel.name}
