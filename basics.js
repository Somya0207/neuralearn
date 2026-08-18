const name = "Somya";
let age = 25;
console.log(name, age);

age = 26; // this works - let allows reassignment
console.log(age);

let result;
console.log(result);        // what do you think this prints?
console.log(typeof result); // and this?

const student = null;
console.log(typeof student); // and this? (this one's a famous JS gotcha)

// traditional function
function multiply(a, b) {
  return a * b;
}

// arrow function - same thing, different syntax
const multiply2 = (a, b) => {
  return a * b;
};

// arrow function - even shorter, for one-line returns (implicit return)
const multiply3 = (a, b) => a * b;


const topics = ["Arrays", "Recursion", "Graphs"];
console.log(topics[0]);
console.log(topics.length);   // like Python's len(topics)

topics.push("Dynamic Programming");
console.log(topics);

topics[1] = "Recursion & Backtracking"; // mutating an existing index - totally fine
console.log(topics);


const scores = [72, 88, 95, 61];

const doubled = scores.map(s => s * 2);
console.log("doubled:", doubled);

const highScores = scores.filter(s => s >= 80);
console.log("highScores:", highScores);

const total = scores.reduce((acc, s) => acc + s, 0);
console.log("total:", total);


const lecture = {
  title: "Recursion Basics",
  duration: 11,
  difficulty: "intermediate",
  isCompleted: false
};

console.log(lecture.title);        // dot notation
console.log(lecture["duration"]);  // bracket notation - like Python's dict["key"]

lecture.isCompleted = true;        // update a property
lecture.rating = 4.5;              // add a new property entirely
console.log(lecture);