const employeeInfo = [];
const deptInfo = [];
const computerInfo = [];

function getEmployeeInfo() {
  fetch("http://localhost:8088/employees")
    .then(jsonData => jsonData.json())
    .then(data => data.forEach(obj => {
      employeeInfo.push(obj)}))
    .then(getDepartmentInfo);
}

function getDepartmentInfo() {
  fetch("http://localhost:8088/departments")
    .then(jsonData => jsonData.json())
    .then(data => data.forEach(obj => {
      deptInfo.push(obj)}))
    .then(getComputerInfo);
}

function getComputerInfo() {
    fetch("http://localhost:8088/computers")
    .then(jsonData => jsonData.json())
    .then(data => data.forEach(obj => {
      computerInfo.push(obj)}))
    .then(appendToDOM())
}

function appendToDOM() {
  const container = document.getElementById("container");

  for (idx = 0; idx < employeeInfo.length; idx++) {
    container.innerHTML += makeEmployeeCard(employeeInfo, deptInfo, computerInfo, idx)
  }

}

function makeEmployeeCard(employeeArr, deptArr, computerArr, idx) {
    let employeeName = employeeArr[idx].name;
    let employeeDept;
    let employeeComp;

    // determine employee dept
    let idNum = employeeArr[idx].deptId;

    deptArr.forEach(obj => {
      for (key in obj) {
        if (key === "id" && obj[key] === idNum) {
          employeeDept = obj.name;
        }
      }
    })

    // determine employee computer
    let idNum2 = employeeArr[idx].computerId;

    computerArr.forEach(obj => {
      for (key in obj) {
        if (key === "id" && obj[key] === idNum2) {
          employeeComp = obj.type;
        }
      }
    })

    // return string template
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