from flask_sqlalchemy import SQLAlchemy
from .fwd_declaration_sql_auto import SQLAlchemyFwd

db: SQLAlchemyFwd = SQLAlchemy()
