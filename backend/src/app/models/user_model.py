from database import db

from werkzeug.security import generate_password_hash, check_password_hash


class UserModel(db.Model):
    # noinspection SpellCheckingInspection
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(32), index=True)
    password_hash = db.Column(db.String(128))
    tasks = db.relationship('TaskModel', backref='user')

    def __init__(self, name, password):
        self.username = name
        self.password_hash = self.hash_password(password)

    @staticmethod
    def hash_password(password):
        return generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def as_dict(self):
        return {'id': self.id,
                'username': self.username}
