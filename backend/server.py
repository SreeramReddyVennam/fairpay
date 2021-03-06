import random
import json as jsn
from flask import *
from pymongo import MongoClient
from pymongo.server_api import ServerApi

active_orders = {
    # hash: {
    #     id: {
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

def get_price(item, shop):
    prices = db[shop+"_menu"]
    item_price = prices.find_one({'item': item})
    return int(item_price['price'])

def gen_order_id():
    return str(random.randint(1000, 9999))

def gen_hash():
    return str(random.getrandbits(128))

def check_password(usrname, password):
    login_details = db.shop_login_details.find_one()[usrname]
    if login_details is None:
        return False
    return login_details == password 

@app.route('/generate/cookie', methods=['GET'])
def cookie_gen():
    return gen_hash()

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
    resp = make_response(render_template('client.html'))
    ck = request.cookies.get('fairpay')
    if ck is None:
        resp.set_cookie('fairpay', 'bruh1')
    return resp
    

@app.route('/orders', methods=['GET'])
def process_orders():
    ck = request.cookies.get('fairpay')
    if ck is None:
        return ""
    return jsn.dumps(active_orders[ck])

@app.route('/orders/<shop>', methods=['POST'])
def make_order(shop):
    ck = request.cookies.get('fairpay')
    form_items = request.form
    ord_id = gen_order_id()
    if ck not in active_orders:
        active_orders[ck] = {}
    active_orders[ck][ord_id] = {
        'shop': shop
    }
    active_orders[ck][ord_id]['items'] = []
    total = 0
    for k, v in form_items.items():
        total += int(v) * get_price(k, shop)
        active_orders[ck][ord_id]['items'].append((k, int(v), get_price(k, shop)))
    active_orders[ck][ord_id]['total'] = total
    active_orders[ck][ord_id]['status'] = 'new'
    print(active_orders)
    return redirect(url_for('client'))

@app.route('/shop/login', methods = ['GET', 'POST'])
def merchant_login():
    if request.cookies.get('fairpay-merchant') != None:
        return redirect(url_for('shop'))
    if request.method == 'GET':
        return render_template('login.html')
    if check_password(request.form['username'], request.form['password']) is False:
        return render_template('login.html')
    resp = make_response(redirect(url_for('shop')))
    ck = gen_hash()
    resp.set_cookie('fairpay-merchant',ck)
    shop_cookies[ck] = request.form['username']
    return resp

@app.route('/shop')
def shop():
    ck = request.cookies.get('fairpay-merchant')
    resp = make_response(render_template('shop.html'))
    print(ck)
    if ck is None:
        print("KLDFLKJSHFJHDLHSF")
        return redirect(url_for("merchant_login"))
        #gh = gen_hash()
        #resp.set_cookie('fairpay-merchant', gh);
        #shop_cookies[gh] = 'bbc'
    return resp
    # login form
    None

@app.route('/shop/orders')
def shop_orders():
    ck = request.cookies.get('fairpay-merchant')
    active_shop_orders = {}
    for key, vals in active_orders.items():
        for k, v in vals.items():
            print(f"BURH: {v}")
            print(f"BRUHRUHBR: {shop_cookies}, {ck}")
            if v['shop'] == shop_cookies[ck]:
                active_shop_orders[k] = v
    return json.dumps(active_shop_orders)

@app.route('/shop/orders/update', methods=['POST'])
def shop_orders_update():
    ck = request.cookies.get('fairplay-merchant')
    req = request.get_json()
    for k, v in active_orders.items():
        if  req['id'] in v.keys():
            v[req['id']]['status'] = req['status']
    return "ok"


if __name__ == '__main__':
    app.run()