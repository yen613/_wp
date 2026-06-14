const user = {
  name: "Alex",
  age: 25,
  skills: ["JavaScript", "HTML", "CSS"]
};

function introduce(person) {
  console.log(`Hi, I am ${person.name}, I know ${person.skills.join(", ")}.`);
}
introduce(user);