from database import db

from .session_model import SessionModel


class TaskModel(db.Model):
    # noinspection SpellCheckingInspection
    __tablename__ = 'tasks'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(32), index=True)
    color = db.Column(db.String(8))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    active = db.Column(db.Boolean, default=False)
    sessions = db.relationship('SessionModel', backref='tasks', cascade="all,delete", lazy='dynamic')

    def as_dict(self):
        return {'name': self.name,
                'color': self.color,
                'active': self.active,
                'id': self.id}

    def _stop_active_session(self):
        active_session: SessionModel = self.sessions.filter_by(end=None).first()
        if active_session:
            active_session.stop()

    def start_timer(self):
        active_user_task = TaskModel.query.filter_by(user_id=self.user_id, active=True).first()
        if active_user_task:
            active_user_task.stop_timer()

        self._stop_active_session()

        session = SessionModel(task_id=self.id)
        self.active = True
        db.session.add(session)
        db.session.commit()

    def stop_timer(self):
        self._stop_active_session()
        self.active = False
        db.session.commit()
