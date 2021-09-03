"use stricy";
//https://petlatkea.dk/2021/hogwarts/students.json

window.addEventListener("DOMContentLoaded", start);

const studentList = [];
let Student = {
  firstName: "",
  middleName: "",
  lastName: "",
  nickName: "",
  image: "",
  house: "",
};

function start() {
  console.log("start()");
  loadJSON();
}

function loadJSON() {
  //this function fetches the content of the json data
  //and sends the data to the function prepareStudents
  fetch("https://petlatkea.dk/2021/hogwarts/students.json")
    .then((response) => response.json())
    .then((jsonData) => {
      // when loaded, prepare objects
      prepareStudents(jsonData);
    });
}
function prepareStudents(jsonData) {
  //this functions loops through each object in the json document
  //it makes a copy of the Student object
  //and fills it by calling other functions that translates and cleans the data into the categories we need
  jsonData.forEach((jsonObject) => {
    console.log("prepareStudents: ");
    console.log(jsonObject);
    const student = Object.create(Student);
    student.firstName = getCleanFirstName(jsonObject.fullname.trim());
    student.lastName = getCleanLastName(jsonObject.fullname.trim());
    student.middleName = getCleanMiddleName(jsonObject.fullname.trim());
    studentList.push(student);
  });
  console.log(studentList);
  //   displayList();
}

function getCleanFirstName(fullname) {
  const firstName = fullname.trim().slice(0, fullname.indexOf(" "));
  const firstLetter = firstName.slice(0, 1).toUpperCase();
  const restOfFirstName = firstName.slice(1).toLowerCase();
  const cleanFirstName = firstLetter + restOfFirstName;
  console.log(cleanFirstName);
  return cleanFirstName;
}

function getCleanLastName(fullname) {
  const lastName = fullname.trim().slice(fullname.lastIndexOf(" ") + 1);
  const firstLetter = lastName.slice(0, 1).toUpperCase();
  const restOfFirstName = lastName.slice(1).toLowerCase();
  const cleanLastName = firstLetter + restOfFirstName;
  console.log(cleanLastName);
  return cleanLastName;
}
