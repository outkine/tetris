from flask import Flask, render_template, session
from os import path, urandom
from functools import wraps
from flask_socketio import SocketIO, emit

def templated(layout):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            func(*args, **kwargs)
            return render_template('index.html', layout=layout)
        return wrapper
    return decorator


BASE_PATH = path.dirname(path.abspath(__file__))

app = Flask(__name__, static_url_path='', static_folder=path.join(BASE_PATH, 'www'))
app.config.update(
    SECRET_KEY = b'\xb1\xfe\xf8\x8f\xc8\x06\xf2$+H8ft \x92\xcczk\xc7\x9fP\xc5<\x1d',
    DEBUG = True
)
socketio = SocketIO(app)

queue = []
pairs = {}


@app.route('/')
@templated('start')
def home():
    pass

@app.route('/loading')
@templated('loading')
def loading():
    session['id'] = urandom(16)
    # print(queue, session['id'])
    if queue:
        session['opponent'] = queue.pop(0)
        pairs[session['opponent']] = session['id']
        print(session['opponent'], 'is here')
        print(session['id'], 'am I')
    else:
        print('no one here :(,', session['id'], 'am i')
        session['opponent'] = None
        queue.append(session['id'])

@app.route('/game')
def game():
    if session['opponent'] or session['id'] in pairs:
        print(session['id'], session['opponent'])
        if not session['opponent']:
            session['opponent'] = pairs.pop(session['id'])
            print('I found', session['opponent'])
        return render_template('index.html', layout='game', id=session['id'])
    else:
        return ('', 204)

# @socketio.on('move')
# def process_move(data):
    # print(data)
    # if data['id'] == session['opponent']:
        # emit('opponent_move', {data['grid']})


@app.route('/singleGame')
@templated('singleGame')
def singleGame():
    pass


# for debugging only
@app.after_request
def add_header(r):
    r.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    r.headers["Pragma"] = "no-cache"
    r.headers["Expires"] = "0"
    r.headers['Cache-Control'] = 'public, max-age=0'
    return r


if __name__ == '__main__':
    socketio.run(app)
