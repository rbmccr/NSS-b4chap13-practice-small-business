const employeeInfo = [];
const deptInfo = [];
const computerInfo = [];

//fetch employee objects
function getEmployeeInfo() {
  fetch("http://localhost:8088/employees")
    .then(jsonData => jsonData.json())
    .then(data => {
      data.forEach(obj => {
      employeeInfo.push(obj)
      })
    return getDepartmentInfo();
    })
}

//fetch department objects
function getDepartmentInfo() {
  fetch("http://localhost:8088/departments")
    .then(jsonData => jsonData.json())
    .then(data => {
      data.forEach(obj => {
      deptInfo.push(obj)
      })
    return getComputerInfo();
    })
}

//fetch computer objects
function getComputerInfo() {
    fetch("http://localhost:8088/computers")
    .then(jsonData => jsonData.json())
    .then(data => {
      data.forEach(obj => {
      computerInfo.push(obj)
      })
    return appendToDOM();
    })
}

// append innerHTML of container element with employee cards
function appendToDOM() {
  const container = document.getElementById("container");
  for (idx = 0; idx < employeeInfo.length; idx++) {
    container.innerHTML += makeEmployeeCard(employeeInfo, deptInfo, computerInfo, idx)
  }
}

// This function accepts three arrays and the index of a for loop.
function makeEmployeeCard(employeeArr, deptArr, computerArr, idx) {
    let employeeName = employeeArr[idx].name;
    let employeeDept;
    let employeeComp;

    // determine employee dept
    // target the department ID in the employee at index [idx]
    let idNum = employeeArr[idx].deptId;

    // for each object in the department array (of objects), look for 
    // the "id" key and make sure its value matches the department ID
    // assigned to the employee at index [idx]. If so, assigned the
    // department name to the employeeDept variable
    deptArr.forEach(obj => {
      for (key in obj) {
        if (key === "id" && obj[key] === idNum) {
          employeeDept = obj.name;
        }
      }
    })

    // determine employee computer
    // same process as identification of employee department, only
    // this time for the computer ID
    let idNum2 = employeeArr[idx].computerId;

    computerArr.forEach(obj => {
      for (key in obj) {
        if (key === "id" && obj[key] === idNum2) {
          employeeComp = obj.type;
        }
      }
    })

    // return string template (card)
    return `
    <article class="employee">
        <header class="employee__name">
            <h1>${employeeName}</h1>
        </header>
        <section class="employee__department">
            Works in ${employeeDept}
        </section>
        <section class="employee__computer">
            Currently using a ${employeeComp}
        </section>
    </article>`
}

//call first fetch to automatically display DOM cards on page load
getEmployeeInfo();