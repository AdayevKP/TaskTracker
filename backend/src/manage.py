from flask_script import Manager
from flask_migrate import Migrate, MigrateCommand

# noinspection PyUnresolvedReferences
import app.models  # this import need to update tables in db from models
from app import create_app
from database import db


if __name__ == '__main__':
    app = create_app()
    with app.app_context():
        migrate = Migrate(app, db)

    manager = Manager(app)
    manager.add_command('db', MigrateCommand)
    manager.run()
