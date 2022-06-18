import json as jsn
from flask import *
from pymongo import MongoClient

app = Flask(__name__)
client = MongoClient('mongodb+srv://herocharge:herocharge@cluster0.ly1r8.mongodb.net/?retryWrites=true&w=majority', 27017, username='herocharge', password='herocharge')

db = client.fairplay

@app.route('/resources/menu/<shop>')
def menu(shop):
    shop_menu = db[shop+"_menu"]
    results = shop_menu.find()
    res = []
    for r in results:
        res.append(str(r))
    return str(res)
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