import os
import sys
import argparse
import platform

SUCCESS = 0

LINUX = 'Linux'
MAC = 'Darwin'
WIN = 'Windows'
SYSTEM = platform.system()

if SYSTEM == WIN:
    PYTHON = 'python'
    ACTIVATE_EVN = os.path.join(os.getcwd(), 'venv', 'Scripts', 'activate')
elif SYSTEM == LINUX or SYSTEM == MAC:
    PYTHON = 'python3'
    ACTIVATE_EVN = 'source ' + os.path.join('venv', 'bin', 'activate')
else:
    raise Exception('Unsupported platform')


def parse_args():
    parser = argparse.ArgumentParser()
    group = parser.add_mutually_exclusive_group(required=True)
    group.add_argument('--venv', action='store_true', help='creates virtual env for python')
    group.add_argument('--run_server', action='store_true', help='starts server')

    return parser.parse_args()


def check_env():
    if os.system(ACTIVATE_EVN) != SUCCESS:
        print('Cannot activate virtual environment. Run "toolbox.py --venv" to create it')
        sys.exit(0)


def create_env():
    venv_path = os.path.join(os.getcwd(), 'venv')

    os.system('{python} -m venv {venv_path}'.format(
        python=PYTHON,
        venv_path=venv_path))

    check_env()

    os.system('{activate_env} && pip install -r {req}'.format(
        activate_env=ACTIVATE_EVN,
        req=os.path.join(os.getcwd(), 'src', 'requirements.txt')))

    print('Virtual environment successfully created at: {}'.format(venv_path))


def run_script(script_path, args=''):
    check_env()
    os.system('{activate_env} && {python} {script} {args}'.format(
        activate_env=ACTIVATE_EVN,
        python=PYTHON,
        script=script_path,
        args=args))


def run(args):
    if args.venv:
        create_env()

    if args.run_server:
        check_env()
        main_path = os.path.join(os.getcwd(), 'src', 'main.py')
        run_script(main_path)

    if args.run_server:
        main_path = os.path.join(os.getcwd(), 'src', 'main.py')
        run_script(main_path)


if __name__ == "__main__":
    run(parse_args())
