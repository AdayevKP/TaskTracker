from database import db


class TaskModel(db.Model):
    # noinspection SpellCheckingInspection
    __tablename__ = 'tasks'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(32), index=True)
    color = db.Column(db.String(8))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    sessions = db.relationship('SessionModel', backref='tasks', cascade="all,delete", lazy='dynamic')

    def as_dict(self):
        return {'name': self.name,
                'color': self.color,
                'id': self.id}
