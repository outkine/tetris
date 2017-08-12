from flask import Flask, render_template
from os import path
from functools import wraps

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


@app.route('/')
@templated('start')
def home():
    pass

@app.route('/loading')
@templated('loading')
def loading():
    pass

@app.route('/game')
def game():
    if 1 == 1:
        return render_template('index.html', layout='game')
    else:
        return ('', 204)

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
    app.run()
