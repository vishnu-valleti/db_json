const URL = "http://localhost:3000/members";
async function saveData() {
    let input = document.getElementById("name")
    let options = {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json"
        },
        "body": JSON.stringify({
            "name": input.value,
        })
    }
    let response = await fetch(URL, options)
    if (response.ok) {
        // alert("Data Submitted");
        input.value = ``;
        getData();
    }
}
async function getData() {
    let resp = await fetch(URL);
    let data = await resp.json();
    displayData(data);
}
function displayData(students) {
    let container = document.getElementById("container");
    container.innerHTML = ``;
    students.forEach(student => {
        let item = document.createElement("div");
        item.innerHTML = `
            <p><b>ID : </b>${student.id} </p>
            <p><b>NAME : </b>${student.name}</p>
            <button onclick='deleteData("${student.id}")'>Delete</button>
        `;
        container.appendChild(item);
    });
}
async function deleteData(id){
    let options = {
        "method": "DELETE"
    }
    let response = await fetch(`http://localhost:3000/members/${id}`, options);
    if (response.ok) {
        console.log("Deleted");
        getData();
    }

}
getData();