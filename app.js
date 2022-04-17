const studentForm = document.getElementById("studentForm");
const studentsContainer = document.querySelector(".students");
const nameInput = studentForm["name"]; //This is a way to catch the child element of a parent element.  Check index.html to see the relation.
const ageInput = studentForm["age"];
const rollInput = studentForm["roll"];

/* 
{
  name: '',
  age: number,
  roll: number
}
*/

const students = JSON.parse(localStorage.getItem("students"))|| [];

const addStudent = (name,age,roll) => {
    students.push({
        name,
        age,
        roll
    });
    localStorage.setItem("students", JSON.stringify(students))
    return { name, age, roll };
}

const createStudentElement = ({ name, age, roll }) => { //you can destructure the properties of an object as seen here and then only call the part of the object without using something like students.name
    //Create elements
    const studentDiv = document.createElement('div');
    const studentName = document.createElement('h2');
    const studentAge = document.createElement('p');
    const studentRoll = document.createElement('p');
    // Fill the content
    studentName.innerText = "Student name: "+ name;
    studentAge.innerText = "Student age: "+ age;
    studentRoll.innerText = "Student roll: "+roll;
    // Add to the Dom
    studentDiv.append(studentName, studentAge, studentRoll); //You can append several children to one parent by using append instead of appendChild.
    studentsContainer.appendChild(studentDiv)

    studentsContainer.style.display = students.length === 0 ? "none": "flex";
};

studentsContainer.style.display = students.length === 0 ? "none": "flex";
students.forEach(createStudentElement)

studentForm.onsubmit = (e) => {
    e.preventDefault();

    const newStudent = addStudent(
        nameInput.value,
        ageInput.value,
        rollInput.value
    );

createStudentElement(newStudent)
    nameInput.value = "";
    ageInput.value = "";
    rollInput.value = "";
};