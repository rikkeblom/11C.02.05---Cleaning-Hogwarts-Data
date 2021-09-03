"use stricy";
//I DON'T KNOW IF IT WILL MAKE A DIFFERENCE IF IT SAYS '' OR UNDEFINED
//IF THERE IS NO DIFFERENCE THE DATA IS CLEANED AND SORTED

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
    // console.log("prepareStudents: ");
    // console.log(jsonObject);
    const student = Object.create(Student);
    student.firstName = getFirstName(jsonObject.fullname.trim());
    student.lastName = getLastName(jsonObject.fullname.trim());
    student.middleName = getMiddleName(jsonObject.fullname.trim());
    student.nickName = getNickName(jsonObject.fullname.trim());
    student.image = getImage(student.lastName, student.firstName);
    student.house = getHouseName(jsonObject.house.trim());
    studentList.push(student);
  });
  console.table(studentList);
}

function getFirstName(fullname) {
  if (fullname.includes(" ") == true) {
    const firstName = fullname.slice(0, fullname.indexOf(" "));
    const cleanFirstName = cleanName(firstName);
    return cleanFirstName;
  } else {
    const cleanFirstName = cleanName(fullname);
    return cleanFirstName;
  }
}

function getLastName(fullname) {
  if (fullname.includes(" ") == true) {
    const lastName = fullname.slice(fullname.lastIndexOf(" ") + 1);
    const cleanLastName = cleanName(lastName);
    return cleanLastName;
  }
  return undefined;
}

function getMiddleName(fullname) {
  if (fullname.includes(" ") == true) {
    middleSpace = fullname.slice(fullname.indexOf(" ") + 1, fullname.lastIndexOf(" "));
    firstCharacter = middleSpace.slice(0, 1);
    if (firstCharacter !== '"') {
      cleanMiddleName = cleanName(middleSpace);
      return cleanMiddleName;
    }
  }
}

function getNickName(fullname) {
  middleSpace = fullname.slice(fullname.indexOf(" ") + 1, fullname.lastIndexOf(" "));
  firstCharacter = middleSpace.slice(0, 1);
  if (firstCharacter === '"') {
    length = middleSpace.length;
    nickNameWithoutQuotes = middleSpace.slice(1, length - 1);
    // console.log(nickNameWithoutQuotes);
    cleanNickName = cleanName(nickNameWithoutQuotes);
    return cleanNickName;
  }
}

function getHouseName(house) {
  const cleanHouse = cleanName(house);
  return cleanHouse;
}

function getImage(lastname, firstname) {
  //files are named lastname_firstletteroffirstname.png
  //except for the patil twins and Justin Finch-Fletchley
  if (lastname !== undefined) {
    const smallLastName = lastname.toLowerCase();
    const smallFirstName = firstname.toLowerCase();
    const firstLetterOfFirstName = firstname.slice(0, 1).toLowerCase();
    if (lastname == "Patil") {
      const imageSrc = `${smallLastName}_${smallFirstName}.png`;
      return imageSrc;
    } else if (lastname.includes("-") == true) {
      const partOfLastNameAfterHyphen = lastname.slice(lastname.indexOf("-") + 1);
      const imageSrc = `${partOfLastNameAfterHyphen}_${firstLetterOfFirstName}.png`;
      return imageSrc;
    } else {
      const imageSrc = `${smallLastName}_${firstLetterOfFirstName}.png`;
      return imageSrc;
    }
  }
}

function cleanName(name) {
  const firstLetter = name.slice(0, 1).toUpperCase();
  const restOfName = name.slice(1).toLowerCase();
  const cleanName = firstLetter + restOfName;
  return cleanName;
}
