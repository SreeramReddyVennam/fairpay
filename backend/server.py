from flask import *
app = Flask(__name__)

@app.route('/resources/menu/<shop>')
def menu(shop):
    None

@app.route('/')
def client():
    None

@app.route('/shop')
def shop():
    # login form
    None

if __name__ == '__main__':
    app.run()