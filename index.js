document.getElementById("filepicker").addEventListener("change", (event) => {
  let table = document.getElementById("table");
  for (const file of event.target.files) {
    let tr = document.createElement("tr");
    let td = document.createElement('td');
    let td2 = document.createElement('td');
    let td3 = document.createElement('td');
    td.textContent = file.name.replace(/\.[^/.]+$/, "");
    td2.textContent = file.size;
    td3.textContent = "info";
    tr.append(td, td2, td3);
    table.appendChild(tr);
  };
}, false);