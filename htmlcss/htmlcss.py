from flask import (
    Flask,
    render_template,
    url_for,
    redirect,
)


app = Flask(__name__)


@app.route('/')
def index():
    return redirect(url_for('html'))

@app.route('/html')
def html():
    return render_template('html.html')


@app.route('/css')
def css():
    return render_template('css.html')
