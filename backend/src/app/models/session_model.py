import datetime
from database import db


class SessionModel(db.Model):
    # noinspection SpellCheckingInspection
    __tablename__ = 'sessions'
    id = db.Column(db.Integer, primary_key=True)
    start = db.Column(db.DateTime, nullable=False, default=datetime.datetime.now)
    end = db.Column(db.DateTime, nullable=True)
    task_id = db.Column(db.Integer, db.ForeignKey('tasks.id'))

    def as_dict(self):
        return {'id': self.id,
                'start': self.start,
                'end': self.end,
                'task_id': self.task_id}

    def active(self):
        return not bool(self.end)

    def stop(self):
        self.end = datetime.datetime.now()
