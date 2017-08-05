from functools import wraps
from flask import Flask, render_template
from os import path

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


if __name__ == '__main__':
    app.run()
