let form = document.getElementById("form");


const retrieveEntries = () => {
  let entries = localStorage.getItem("userEntry");

  if (entries) {
    entries = JSON.parse(entries);
  } 
  else 
  {
    entries = [];
  }
  return entries;
};

let Entries = retrieveEntries();

const dispEntries = () => {
  const entries = retrieveEntries();

  const rows = entries
    .map((entry) => {
      const name = `<td class="td">${entry.name}</td>`;
      const email = `<td class="td">${entry.email}</td>`;
      const password = `<td class="td">${entry.password}</td>`;
      const dob = `<td class="td">${entry.dob}</td>`;
      const acceptConditions = `<td class="td">${entry.acceptConditions}</td>`;

      const row = `<tr>${name} ${email} ${password} ${dob} ${acceptConditions}</tr>`;
      return row;
    })
    .join("\n");

  let tableDiv = document.getElementById("tableDiv");

  
  tableDiv.innerHTML = `<table class="table" border="2">
  <tr>
    <th class="th">Name</th>
    <th class="th">Email</th>
    <th class="th">Password</th>
    <th class="th">Dob</th>
    <th class="th">Accepted terms?</th>
  </tr>
    ${rows}
  </table>`;
};


const saveuser = (event) => {
  event.preventDefault();

  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let dob = document.getElementById("dob").value;
  let acceptConditions = document.getElementById("agree").checked;

  let entry_obj = {
    name,
    email,
    password,
    dob,
    acceptConditions,
  };

  Entries.push(entry_obj);

  localStorage.setItem("userEntry", JSON.stringify(Entries));

  dispEntries();
};

form.addEventListener("submit", saveuser);

dispEntries();



function getAge(today, birthDate) {
  

  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

let dates = document.getElementById("dob");

dates.addEventListener("change", () => {
  let [year, month, date] = document.getElementById("dob").value.split("-");

  let dob = new Date(year, month, date);
  let Today = new Date();

  age = getAge(Today, dob);

  dates.style.border = "2px solid rgba(0, 0, 0, 0.4)";
  if (age < 18 || age > 55) {
    dates.setCustomValidity("Your age is not lies between 18 and 55");
    dates.style.border = "2px solid red";
    return;
  } else {
    dates.setCustomValidity("");
  }
});

const email = document.getElementById("email");

email.addEventListener("input", () => validate(email));

function validate(ele) {
  if (ele.validity.typeMismatch) {
    ele.setCustomValidity("The Email is not in the right format!!!");
    ele.reportValidity();
  } else {
    ele.setCustomValidity("");
  }
}