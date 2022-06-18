BBC_Menu_json = {'A': 1, 'B': 2, 'C' : 3};
JC_Menu_json = {'X': 111, 'Y': 222, 'Z' : 333};
VC_Menu_json = {'L': 101, 'M': 201, 'N' : 301};


var Canteen_Options = document.getElementById("Canteen_Options");
var BBC_Menu = document.getElementById("BBC_Menu");
var VC_Menu = document.getElementById("VC_Menu");
var JC_Menu = document.getElementById("JC_Menu");

function bbc_menu(){
    for (const [key, value] of Object.entries(BBC_Menu_json)) {
    console.log(key, value);
    var item = CreateItem("BBC_Menu",key,value);
    }
    Canteen_Options.style["display"] = "None";
    BBC_Menu.style["display"] = "block";
}

function jc_menu(){
    for (const [key, value] of Object.entries(JC_Menu_json)) {
    console.log(key, value);
    var item = CreateItem("JC_Menu",key,value);
    }
    Canteen_Options.style["display"] = "None";
    JC_Menu.style["display"] = "block";
}

function vc_menu(){
    for (const [key, value] of Object.entries(VC_Menu_json)) {
    console.log(key, value);
    var item = CreateItem("VC_Menu",key,value);
    }
    Canteen_Options.style["display"] = "None";
    VC_Menu.style["display"] = "block";
}

function CreateItem(id,key,value){
    var ParentItem = document.getElementById(id);
    const Item = document.createElement("p");
    Item.innerText = "Item: " + key + " Price: " + value;
    ParentItem.appendChild(Item);
    // <input type="checkbox" key=key value="Bike">
    // <label for="vehicle1"> I have a bike</label><br>
    return Item;
}

function back(){
    window.location.reload();
}