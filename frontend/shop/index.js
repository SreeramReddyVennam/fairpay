const MAX_ORDER_DISPLAY_LENGTH = 50;

var newOrders  = [{id: 100, items: "oreo, banana, chocolate"},{id: 100, items: "oreo, banana, chocolate"},{id: 100, items: "oreo, banana, chocolate"}   ];
var requestedOrders  = [{id: 101, items: "oreo, banana"}];
var confirmedOrders  = [{id: 102, items: "banana, chocolate"}];

var tabnames = ["tab-new", "tab-requested", "tab-confirmed"];

// Change the underline color
function changeTabStyle(index){
    for(let tabname of tabnames){
        let tab = document.getElementById(tabname);
        if(tabname === tabnames[index])
            tab.style.borderBottomColor = "rgb(50, 189, 182)"; 
        else
            tab.style.borderBottomColor = "gray";
    }
}

// represents the type of orders being displayed on screen
// 0 -> new, 1 -> requested, 2 -> confirmed
var contentShown = 0;

// Put new orders in the contents div
function displayNew(){
    contentShown = 0;
    var contentTable = document.getElementById("contents");

    // clear all data already present
    contentTable.innerHTML = "";

    // append the data
    for(let order of newOrders){
        var button = document.createElement("button");
        button.setAttribute("id", order.id); // for future processing
        button.setAttribute("class", "order-button"); // same styling for all orders
        button.innerHTML = "#" + order.id + " " + order.items.slice(0, MAX_ORDER_DISPLAY_LENGTH)+"...";
        // TODO: make a modal, on clicking
        // button.addEventListener('click', showModal(order));
        contentTable.appendChild(button);
    }

    changeTabStyle(contentShown);
}

function displayRequested(){
    contentShown = 1;
    var contentTable = document.getElementById("contents");

    // clear all data already present
    contentTable.innerHTML = "";

    // append the data
    for(let order of requestedOrders){
        var button = document.createElement("button");
        button.setAttribute("id", order.id); // for future processing
        button.setAttribute("class", "order-button"); // same styling for all orders
        button.innerHTML = "#" + order.id + " " + order.items.slice(0, MAX_ORDER_DISPLAY_LENGTH)+"...";
        // TODO: make a modal, on clicking
        contentTable.appendChild(button);
    }
    changeTabStyle(contentShown);
}

function displayConfirmed(){
    contentShown = 2;
    var contentTable = document.getElementById("contents");

    // clear all data already present
    contentTable.innerHTML = "";

    // append the data
    for(let order of confirmedOrders){
        var button = document.createElement("button");
        button.setAttribute("id", order.id); // for future processing
        button.setAttribute("class", "order-button"); // same styling for all orders
        button.innerHTML = "#" + order.id + " " + order.items.slice(0, MAX_ORDER_DISPLAY_LENGTH)+"...";
        // TODO: make a modal, on clicking
        contentTable.appendChild(button);
    }
    changeTabStyle(contentShown);
}

// When the page opens
window.onload = displayNew;