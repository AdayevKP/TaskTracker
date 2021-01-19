import sqlalchemy
from sqlalchemy import orm


if __name__ == "__main__":
    lst = list()
    imports = {}
    for module in sqlalchemy, sqlalchemy.orm:
        for key in module.__all__:
            attr = getattr(module, key)
            if isinstance(attr, type):
                name = getattr(module, key).__name__
                lst.append(key + " = " + str(name))
                imports.setdefault(module.__name__, []).append(name)

    imports_str = ''
    for k, v in imports.items():
        imports_str += 'from {} import {}\n'.format(k, ', '.join(v))

    with open('fwd_declaration_sql_auto.py', 'w') as f:
        f.write('# This file is autogenerated by generate_sql_fwd_declaration.py\n'
                '# do not edit it manually\n'
                'from flask_sqlalchemy import SQLAlchemy\n'
                '{}'
                '\n'
                '\n'
                'class SQL(SQLAlchemy):\n'
                '    {}\n'
                ''.format(imports_str, '\n    '.join(lst))
                )
