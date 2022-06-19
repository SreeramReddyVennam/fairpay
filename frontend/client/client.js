let menu = document.getElementById('menu');
let menuHeading = document.getElementById('menu-heading');
let tableEntries = 0;

url = window.location.href + '/resources/main/'

function httpGet(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

let bbcMenu = JSON.parse(httpGet(url + 'bbc'))
let jcMenu = JSON.parse(httpGet(url + 'jc'))
let vcMenu = JSON.parse(httpGet(url + 'vc'))

let menuItems = {
    'bbc': bbcMenu,
    'jc': jcMenu,
    'vc': vcMenu,
};

console.log(menuItems);

function displayMenu(shop) {

    menu.style['display'] = 'block';
    let menuTableBody = document.getElementById('menu-table')
        .getElementsByTagName('tbody')[0];

    for (let rowId = 0; rowId < tableEntries; rowId++) {
        menuTableBody.deleteRow(1);
    }
    tableEntries = 0;

    for (const [key, value] of Object.entries(menuItems[shop])) {
        let newRow = menuTableBody.insertRow(tableEntries + 1);
        tableEntries += 1;

        let quantityInput = document.createElement('input');
        quantityInput.setAttribute('type', 'number');
        quantityInput.setAttribute('name', shop);

        let entryName = newRow.insertCell(0);
        let entryPrice = newRow.insertCell(1);
        let entryQuantity = newRow.insertCell(2);

        entryName.innerHTML = key;
        entryPrice.innerHTML = value;
        entryQuantity.append(quantityInput);
    }

    let submitRow = menuTableBody.insertRow(tableEntries + 1);
    tableEntries += 1;

    let submitButton = document.createElement('input');
    submitButton.setAttribute('type', 'submit');

    let submitCell = submitRow.insertCell(0);
    submitCell.setAttribute('colspan', '3');
    submitCell.append(submitButton);
}

function displayBBC() {
    menuHeading.innerHTML = "BBC";
    displayMenu('bbc');
}
function displayJC() {
    menuHeading.innerHTML = "JC";
    displayMenu('jc');
}
function displayVC() {
    menuHeading.innerHTML = "VC";
    displayMenu('vc');
}