const dataForm = document.getElementById("send-data");
const loadData = document.getElementById("load-data");
const tableData = document.getElementById("table-data");

function submitDataForm(event) {
    event.preventDefault();

    const formData = new FormData(this);
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", "https://83wvrq58ja.execute-api.us-east-2.amazonaws.com/items");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(Object.fromEntries(formData)));

    this.reset();
}

function loadDataClicked(event) {
    event.preventDefault();

    let xhr = new XMLHttpRequest();
    xhr.addEventListener("load", function() {
        let allData = JSON.parse(xhr.response);

        const tbodyData = tableData.children[1];

        /* Not efficient at all, but it works */
        while(tbodyData.children[0]) {
            tbodyData.removeChild(tbodyData.children[0]);
        }

        for(let data of allData) {
            let tableRow = document.createElement("tr");
            
            let tableDataID = document.createElement("td");
            tableDataID.innerHTML = data.id;
            tableRow.appendChild(tableDataID);

            let tableDataName = document.createElement("td");
            tableDataName.innerHTML = data.name;
            tableRow.appendChild(tableDataName);

            let tableDataPrice = document.createElement("td");
            tableDataPrice.innerHTML = data.price;
            tableRow.appendChild(tableDataPrice);

            let tableDataDelete = document.createElement("td");
            let deleteButton = document.createElement("button");
            deleteButton.innerHTML = "Delete";
            deleteButton.addEventListener("click", function() {
                tbodyData.removeChild(tableRow);
                xhr = new XMLHttpRequest();
                xhr.open("DELETE", "https://83wvrq58ja.execute-api.us-east-2.amazonaws.com/items/" + data.id);
                xhr.setRequestHeader("Content-Type", "application/json");
                xhr.send();
            });

            tableDataDelete.classList.add("delete-button")
            tableDataDelete.appendChild(deleteButton);
            tableRow.appendChild(tableDataDelete);
            tbodyData.appendChild(tableRow);
        }
    });

    xhr.open("GET", "https://83wvrq58ja.execute-api.us-east-2.amazonaws.com/items");
    xhr.send();
}

dataForm.addEventListener("submit", submitDataForm);
loadData.addEventListener("click", loadDataClicked);