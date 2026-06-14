const students = [
  { name: "Alice", score: 85 },
  { name: "Bob", score: 50 },
  { name: "Charlie", score: 75 }
];

function getPassedStudents(studentList) {
  let passedNames = [];
  for (let i = 0; i < studentList.length; i++) {
    if (studentList[i].score >= 60) {
      passedNames.push(studentList[i].name);
    }
  }
  return passedNames;
}
console.log(getPassedStudents(students));