from flask import Flask, render_template, session, request
import os
import random
import string
from functools import wraps
from flask_socketio import SocketIO, emit

def random_string(length=16):
    pool = string.ascii_letters + string.digits
    return ''.join(random.choice(pool) for _ in range(length))

def templated(layout):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            func(*args, **kwargs)
            return render_template('index.html', layout=layout)
        return wrapper
    return decorator

BASE_PATH = os.path.dirname(os.path.abspath(__file__))

app = Flask(__name__, static_url_path='', static_folder=os.path.join(BASE_PATH, 'www'))
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
    print('LOADING', session, queue)
    if 'id' not in session:
        session['id'] = random_string()
        print('NEWID:', session['id'])
    if queue:
        session['opponent'] = queue.pop(0)
        session.modified = True
        pairs[session['opponent']] = session['id']
        print('FOUND:', session['opponent'], 'ID:', session['id'])
    else:
        print('NOFOUND, ID:', session['id'])
        session['opponent'] = None
        session.modified = True
        queue.append(session['id'])

@app.route('/game')
def game():
    print('ENTER ATTEMPT BY ID', session['id'], 'OPPONENT:', session['opponent'], 'PAIRS', pairs, 'QUEUE', queue)
    if session['opponent'] or (session['id'] in pairs) or (len(queue) > 1):
        print('SUCCESS!')
        if len(queue) > 1:
            queue.remove(session['id'])
            pairs[queue.pop(0)] = session['id']
            print('BC OF QUEQUE OVERFLOW')

        elif not session['opponent']:
            session['opponent'] = pairs.pop(session['id'])
            session.modified = True
            print('FOUND', session['opponent'])
        return render_template('index.html', layout='game', id=session['id'], opponent=session['opponent'])
    else:
        return ('', 204)

@socketio.on('move')
def process_move(data):
    print('SEND DATA ID:', data['id'])
    emit('moveOther', data, broadcast=True)


@app.route('/singleGame')
@templated('singleGame')
def singleGame():
    pass


###### DEBUG (AGAIN :( )
@app.before_request
def log():
    if request.path not in ('/game', '/loading') and '.' not in request.path and session['id'] in queue:
        print('QUEUE CLEARED! BITCH')
        queue.remove(session['id'])


@app.after_request
def add_header(r):
    r.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    r.headers["Pragma"] = "no-cache"
    r.headers["Expires"] = "0"
    r.headers['Cache-Control'] = 'public, max-age=0'
    return r
############

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0')
