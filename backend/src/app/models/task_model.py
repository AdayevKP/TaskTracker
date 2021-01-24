from database import db


class Task(db.Model):
    # noinspection SpellCheckingInspection
    __tablename__ = 'tasks'
    id = db.Column(db.Integer, primary_key=True)
