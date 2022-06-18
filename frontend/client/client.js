let menu = document.getElementById('menu');
let menuHeading = document.getElementById('menu-heading');
let tableEntries = 0;

let bbcMenu = {
    'item1': 'price1',
    'item2': 'price2',
};
let jcMenu = {
    'item1': 'price3',
    'item2': 'price4',
};
let vcMenu = {
    'item1': 'price5',
    'item2': 'price6',
};

let menuItems = {
    'bbc': bbcMenu,
    'jc': jcMenu,
    'vc': vcMenu,
};

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