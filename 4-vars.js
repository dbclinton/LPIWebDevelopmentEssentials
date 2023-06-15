// Variables and Constants
let firstName = 'John'; // using let to declare a variable
const lastName = 'Doe'; // using const to declare a constant

// Data Types
let age = 30; // number data type
let isStudent = false; // boolean data type
let hobbies = ['reading', 'painting', 'coding']; // array data type

// Variable Scope
function sayHello() {
  let message = 'Hello, ' + firstName + ' ' + lastName;
  console.log(message);
}

sayHello(); // Output: Hello, John Doe

console.log(firstName); // Output: John
console.log(lastName); // Output: Doe
console.log(age); // Output: 30
console.log(isStudent); // Output: false
console.log(hobbies); // Output: [ 'reading', 'painting', 'coding' ]

// Variable Scope - Block scope
function calculate() {
  let result = 0;
  if (age > 18) {
    let bonus = 10;
    result = age + bonus;
    console.log(result); // Output: 40
  }
  console.log(result); // Output: 40
  console.log(bonus); // Output: ReferenceError: bonus is not defined
}

calculate();

