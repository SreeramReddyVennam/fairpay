import json as jsn
from flask import *
from pymongo import MongoClient
from pymongo.server_api import ServerApi

app = Flask(__name__)
client = MongoClient("mongodb+srv://vnnm:Password!_404@main.gtvbo.mongodb.net/?retryWrites=true&w=majority", server_api=ServerApi('1'))

db = client.myFirstDatabase

@app.route('/generate/cookie')
def cookie():
    None

@app.route('/resources/menu/<shop>')
def menu(shop):
    shop_menu = db[shop+"_menu"]
    results = shop_menu.find()
    res = []
    for r in results:
        res.append(str(r))
    return str(res)

@app.route('/')
def client():
    return render_template('client.html')

@app.route('/shop')
def shop():
    # login form
    None

if __name__ == '__main__':
    app.run()