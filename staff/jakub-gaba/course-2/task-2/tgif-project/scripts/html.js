
var API = 'werjoImcxnptmekG4oOVTHidgbQOBbmJh4gj90mn';
var url = 'https://api.propublica.org/congress/v1/117/senate/members.json';
var D = [];
var ID = [];
var R = [];
var congressData;



export async function fetchJson() {            //Fetching data from JSON
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "X-API-Key": API
    }
  });
  const data = await response.json();
  return data;
}

export function makeMemberRows(data) {
  for (let i = 0; i <= data.results[0].members.length - 1; i++) {
    if (data.results[0].members[i].facebook_account == null) { }
    else {
      console.log('https://www.facebook.com/' + data.results[0].members[i].facebook_account);
    }
  }
  congressData = data;
  filterByParty(data);
  makeStatesMenu();
}

export function filterByParty(data) {
  for (let i = 0; i <= data.results[0].members.length - 1; i++) {
    if (data.results[0].members[i].party == "D") {
      D.push(data.results[0].members[i].first_name + " " + data.results[0].members[i].last_name);

    } else if (data.results[0].members[i].party == "ID") {
      ID.push(data.results[0].members[i].first_name + " " + data.results[0].members[i].last_name);

    } else {
      R.push(data.results[0].members[i].first_name + " " + data.results[0].members[i].last_name);
    }
  }

}

export async function showStateData() {
  const response = await fetch("./states.json");
  const data = await response.json();
  return data;
}


var Republicans = document.querySelector("input[id=republicanscheckbox]");
var Democrats = document.querySelector("input[id=democratscheckbox]");
var Independent = document.querySelector("input[id=independentcheckbox]");
var addStates = document.getElementById("states_add");
document.getElementById("states_add").onchange = function () { changing() };

function changing() {                    //Changing states
  if (Republicans.checked || Democrats.checked || Independent.checked) {
    var stateRep = "statesChangeRep";
    var stateDem = "statesChangeDem";
    var stateInd = "statesChangeInd";
    document.getElementById("R").innerHTML = "";
    document.getElementById("D").innerHTML = "";
    document.getElementById("ID").innerHTML = "";
    document.getElementById("statesChangeRep").innerHTML = "";
    document.getElementById("statesChangeDem").innerHTML = "";
    document.getElementById("statesChangeInd").innerHTML = "";
    for (let i = 0; i <= congressData.results[0].members.length - 1; i++) {
      if (congressData.results[0].members[i].state.includes(document.getElementById("states_add").value) == true) { //porovnava jestli stat na indexu obsahuje stat zadanej
        if ((congressData.results[0].members[i].party == "R") && (Republicans.checked)) {
          document.getElementById("R").innerHTML = "";
          writeToHTML(stateRep, congressData.results[0].members[i].first_name, congressData.results[0].members[i].last_name, congressData.results[0].members[i].party);
        }
        else if ((congressData.results[0].members[i].party == "D") && (Democrats.checked)) {
          document.getElementById("D").innerHTML = "";
          writeToHTML(stateDem, congressData.results[0].members[i].first_name, congressData.results[0].members[i].last_name, congressData.results[0].members[i].party);
        }
        else if ((congressData.results[0].members[i].party == "ID") && (Independent.checked)) {
          document.getElementById("ID").innerHTML = "";
          writeToHTML(stateInd, congressData.results[0].members[i].first_name, congressData.results[0].members[i].last_name, congressData.results[0].members[i].party);
        }
        else if ((congressData.results[0].members[i].party == "R") && (congressData.results[0].members[i].party == "D") && (Democrats.checked) && (Republicans.checked)) {
          document.getElementById("D").innerHTML = "";
          document.getElementById("R").innerHTML = "";
          if (congressData.results[0].members[i].party == "R") {
            writeToHTML(stateRep, congressData.results[0].members[i].first_name, congressData.results[0].members[i].last_name, congressData.results[0].members[i].party);
          }
          else {
            writeToHTML(stateDem, congressData.results[0].members[i].first_name, congressData.results[0].members[i].last_name, congressData.results[0].members[i].party);
          }
        }
        else if ((congressData.results[0].members[i].party == "R") && (congressData.results[0].members[i].party == "ID") && (Independent.checked) && (Republicans.checked)) {
          document.getElementById("ID").innerHTML = "";
          document.getElementById("R").innerHTML = "";
          if (congressData.results[0].members[i].party == "R") {
            writeToHTML(stateRep, congressData.results[0].members[i].first_name, congressData.results[0].members[i].last_name, congressData.results[0].members[i].party);
          }
          else {
            writeToHTML(stateInd, congressData.results[0].members[i].first_name, congressData.results[0].members[i].last_name, congressData.results[0].members[i].party);
          }
        }
        else if ((congressData.results[0].members[i].party == "D") && (congressData.results[0].members[i].party == "ID") && (Independent.checked) && (Democrats.checked)) {
          document.getElementById("D").innerHTML = "";
          document.getElementById("ID").innerHTML = "";
          if (congressData.results[0].members[i].party == "D") {
            writeToHTML(stateDem, congressData.results[0].members[i].first_name, congressData.results[0].members[i].last_name, congressData.results[0].members[i].party);
          }
          else {
            writeToHTML(stateInd, congressData.results[0].members[i].first_name, congressData.results[0].members[i].last_name, congressData.results[0].members[i].party);
          }

        }
        else {
          document.getElementById("R").innerHTML = "";
          document.getElementById("D").innerHTML = "";
          document.getElementById("ID").innerHTML = "";
          document.getElementById("statesChangeRep").innerHTML = "";
          document.getElementById("statesChangeDem").innerHTML = "";
          document.getElementById("statesChangeInd").innerHTML = "";
        }
      }
    }
  }
  else {
    document.getElementById("statesChangeRep").innerHTML = "";
    document.getElementById("statesChangeDem").innerHTML = "";
    document.getElementById("statesChangeInd").innerHTML = "";
  }
}

function writeToHTML(idBro, nameBud, lastNameBud, partyBro) {
  var row = document.getElementById(idBro).insertRow();
  var cell = row.insertCell();
  cell.innerHTML = nameBud + " " + lastNameBud + " " + partyBro;
}

export function makeStatesMenu() {           // Creates menu for states.
  showStateData().then(data => {
    const keys = Object.keys(data);
    const value = Object.values(data);
    for (let i = 0; i < keys.length; i++) {
      let opt = document.createElement('option');
      opt.value = keys[i];
      opt.innerHTML = value[i];
      addStates.appendChild(opt);
    }
  })
};


Republicans.addEventListener('change', function () {
  if (this.checked && (document.getElementById("states_add").value == "") == true) {
    for (let i = 0; i <= R.length - 1; i++) {
      var row = document.getElementById("R").insertRow();
      var cell = row.insertCell();
      cell.innerHTML = R[i];
    }
  }
  else if (!this.checked) {
    document.getElementById("statesChangeRep").innerHTML = "";
    document.getElementById("R").innerHTML = "";
  }
  else if (this.checked && (document.getElementById("states_add").value == "") == false) {
    console.log(document.getElementById("states_add").value == "");
    changing();
  }
  else if (this.checked && Democrats.checked && (document.getElementById("states_add").value == "") == false) {
    changing();
  }
  else if (this.checked && Independent.checked && (document.getElementById("states_add").value == "") == false) {
    changing();
  }
  else {
    document.getElementById("R").innerHTML = "";
  }
});


Democrats.addEventListener('change', function () {
  if (this.checked && (document.getElementById("states_add").value == "") == true) {
    for (let i = 0; i <= D.length - 1; i++) {
      var row = document.getElementById("D").insertRow();
      var cell = row.insertCell();
      cell.innerHTML = D[i];
    }
  }
  else if (!this.checked) {
    document.getElementById("statesChangeDem").innerHTML = "";
    document.getElementById("D").innerHTML = "";
  }
  else if (this.checked && (document.getElementById("states_add").value == "") == false) {
    console.log(document.getElementById("states_add").value == "");
    changing();
  }
  else if (this.checked && Republicans.checked && (document.getElementById("states_add").value == "") == false) {
    changing();
  }
  else if (this.checked && Independent.checked && (document.getElementById("states_add").value == "") == false) {
    changing();
  }
  else {
    document.getElementById("D").innerHTML = "";
  }
});


Independent.addEventListener('change', function () {
  if (this.checked && (document.getElementById("states_add").value == "") == true) {
    for (let i = 0; i <= ID.length - 1; i++) {
      var row = document.getElementById("ID").insertRow();
      var cell = row.insertCell();
      cell.innerHTML = ID[i];
    }
  }
  else if (!this.checked) {
    document.getElementById("statesChangeInd").innerHTML = "";
    document.getElementById("ID").innerHTML = "";
  }
  else if (this.checked && (document.getElementById("states_add").value == "") == false) {
    console.log(document.getElementById("states_add").value == "");
    changing();
  }
  else if (this.checked && Republicans.checked && (document.getElementById("states_add").value == "") == false) {
    changing();
  }
  else if (this.checked && Democrats.checked && (document.getElementById("states_add").value == "") == false) {
    changing();
  }
  else {
    document.getElementById("ID").innerHTML = "";
  }
});

