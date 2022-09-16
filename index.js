function sortByExt(files) {
    let arr = [];
    for (let x of files) { 
        let a =  x.split(/[\.]/g).filter(i => i.length > 0); 
        let b = '';
        if (a.length >= 2 && !x.endsWith('.'))
            b = a[a.length - 1];
    arr.push([b, x.replace(b, '')]);
    }
    return arr.sort().map(x => x[1].concat(x[0]));
}

function formatFileSize(bytes,decimalPoint) {
   if(bytes == 0) return '0 Bytes';
   var k = 1000,
       dm = decimalPoint || 2,
       sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
       i = Math.floor(Math.log(bytes) / Math.log(k));
   return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

document.getElementById("filepicker").addEventListener("change", (event) => {
  document.getElementById("select_div").style.display = 'none';
  document.getElementById("table").style.visibility = 'visible';
  let table = document.getElementById("table");
  let arr1 = [];
  let arr2 = [];
  let arr3 = [];
  let arr_in = [];
  let i = 0;
  for(const file of event.target.files){
    if(i<10){
      arr1.push(`0${i}${file.name}`);
    }else{
    arr1.push(`${i}${file.name}`);
  }
    arr1 = sortByExt(arr1);
    arr2.push(file.size);
    arr3.push([file.type, file.lastModifiedDate, file.name.split('.').pop()]);
    i++;
  }

  for(let x in arr1){
    arr_in.push(arr1[x].substring(0, 2));
    arr1[x] = arr1[x].substring(2);
  }

  for(let x in arr2){
    arr2[x] = formatFileSize(arr2[x], 2);
  }

  for(let x in arr_in){
    let tr = document.createElement("tr");
    let td = document.createElement('td');
    let td2 = document.createElement('td');
    let td3 = document.createElement('td');
    let span = document.createElement('span')
    td.textContent = arr1[x].replace(/\.[^/.]+$/, "");
    for(let x in arr_in){
      console.log(arr_in[x])
      if(arr_in[x] == '00'){
        arr_in[x] = 0;
      }
      else if(parseInt(arr_in[x]) < 10){
        arr_in[x] = arr_in[x].replace('0', '');
      }
    }
    console.log('ksdlfjsldfkj')
    td2.textContent = arr2[arr_in[x]];
    td3.textContent = "info";
    span.textContent = `Type: ${arr3[arr_in[x]][0]}, Last Modified Date: ${arr3[arr_in[x]][1]}, Extension: ${arr3[arr_in[x]][2]}`;
    td3.appendChild(span);
    tr.append(td, td2, td3);
    table.appendChild(tr);
  };
}, false);