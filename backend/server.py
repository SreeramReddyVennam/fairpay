from unicodedata import name
import uuid
import json as jsn
from flask import *
from pymongo import MongoClient
from pymongo.server_api import ServerApi

active_orders = {
    # hash: {
    #     orderId: {
    #         shop:
    #         items:[(name, price, quantity)]
    #         total: ,
    #         status:
    #     }
    # }
}

shop_cookies = {}
user_cookies = {}

app = Flask(__name__)
client = MongoClient("mongodb+srv://vnnm:Password!_404@main.gtvbo.mongodb.net/?retryWrites=true&w=majority", server_api=ServerApi('1'))

db = client.myFirstDatabase

@app.route('/generate/cookie')
def cookie():
    None

def gen_hash():
    return str(uuid.uuid4().hex)

def check_password(usrname, password):
    login_details = db.shop_login_details.find_one()[usrname]
    if login_details is None:
        return False
    return login_details == password 

@app.route('/generate/cookie', methods=['GET'])
def cookie_gen():
    return 

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
    resp = make_response(render_template('index.html'))
    None

@app.route('/orders')
def get_orders():
    ck = request.cookies.get('fairpay')
    if ck is None:
        return ""
    return jsn.dumps(active_orders[ck])

@app.route('/login', methods = ['GET', 'POST'])
def merchant_login():
    if request.method == 'GET':
        return render_template('login.html', 1)
    if check_password(request.form['username'], request.form['password']) is False:
        return render_template('login.html', 0)
    resp = make_response(redirect(url_for('shop')))
    ck = gen_hash()
    resp.set_cookie('fairpay-merchange',ck)
    shop_cookies[ck] = request.form['username']
    return resp

@app.route('/shop')
def shop():
    ck = request.cookies.get('fairpay-merchant')
    if ck is None:
        return redirect(url_for("merchant_login"))
    return render_template('shop.html')
    # login form
    None

@app.route('/shop/orders')
def shop_orders():
    ck = request.cookies.get('fairplay-merchant')
    active_shop_orders = {}
    for (key, value) in active_orders:
        if value['shop'] == shop_cookies[ck]:
            active_orders[key] = value
    return json.dumps(active_shop_orders)


if __name__ == '__main__':
    app.run()