'use strict'; /*
/* 
const bookings = [];

const createBooking = function (
  flightNumber,
  numPassengers = 1,
  price = 199 * numPassengers //can use parameter define before it
) {
  //ES5 => Old way to set a default
  //numPassengers = numPassengers || 1;

  //We are using the same name so we don't have to specify the variable like
  //flightNumber : flightNumber,
  const booking = {
    flightNumber,
    numPassengers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};

createBooking('ABC939');
createBooking('AST456', 2, 599.99);
createBooking('AST456', 3);
createBooking('AST456', undefined, 1000); //undefined is like not passing the parameter
 */

//
//Passing value and object
/* const flight = 'LH234';
const jonas = {
  name: 'Jonas Machin',
  passport: 468486,
};

const checkin = function (flightNum, passenger) {
  flightNum = 'LH999';
  passenger.name = 'M. ' + passenger.name;
  if (passenger.passport === 468486) {
    alert('Check in');
  } else {
    alert('Wrong passport');
  }
};

checkin(flight, jonas);
console.log(flight);
console.log(jonas);

const newPassword = function (person) {
  person.passport = Math.trunc(Math.random() + 100000000);
};
newPassword(jonas);
checkin(flight, jonas);
 */

//
//Accepting callback
/*
//callback funciton
const oneWord = function (str) {
  return str.replaceAll(' ', '').toLowerCase();
};

//callback funciton
const upperFirstWord = function (str) {
  const [fisrt, ...others] = str.split(' ');
  return [fisrt.toUpperCase(), ...others].join(' ');
};

//Higher-order function
const transformer = function (str, fn) {
  console.log(`Original string: ${str}`);
  console.log(`Transformed string: ${fn(str)}`);

  console.log(`Trnasformed by: ${fn.name}`);
};

transformer('JavaScript is the best!', upperFirstWord);
transformer('JavaScript is the best!', oneWord);

//callback funciton
const high5 = function () {
  console.log('👏');
};
document.body.addEventListener('click', high5);
['Jonas', 'Martha', 'Adam'].forEach(high5);
*/

/*
//returning functions
const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

const greeterHey = greet('Hey');
greeterHey('Jonas');
greeterHey('John');

greet('Hello')('John');

// const greetArrow = greeting => {
//   return name => console.log(`${greeting} ${name}`);
// };
const greetArrow = greeting => name => console.log(`${greeting} ${name}`);
greetArrow('Hello')('Antonin');
*/

/*
//Call and Apply methods
const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  booking: [],
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.booking.push({ flight: `${this.iataCode}${flightNum}` });
  },
};

lufthansa.book(239, 'Marcel Eric Loiselle');
lufthansa.book(635, 'John Smith');
console.log(lufthansa);

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  booking: [],
};

const book = lufthansa.book;
//book(23, 'Sarah Williams'); //Error because the this keyword is undefined
//Pass want we want to be the this
book.call(eurowings, 23, 'Sarah Williams');
console.log(eurowings);

book.call(lufthansa, 239, 'Mary Cooper');
console.log(lufthansa);

//Apply method
const flightData = [583, 'Georges Cooper'];
book.apply(eurowings, flightData);
console.log(eurowings);

book.call(eurowings, ...flightData);
console.log(eurowings);

const swiss = {
  airline: 'Swiss Air Lines',
  iataCode: 'LX',
  booking: [],
};

///Bind, set the This but doesn't call the funciton. Return a new function with the this keyword set
const bookEW = book.bind(eurowings);
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);
bookEW(23, 'Steven Williams');

//Hardcode the first parameter
const bookEW23 = book.bind(eurowings, 23);
bookEW23('Eric Loiselle');
bookEW23('Abigael Tremblay');

//With Event Listener
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);
  this.planes++;
  console.log(this.planes);
};
//lufthansa.buyPlane();

document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

//Partial application
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

//like declaring addTax = (value) => value + value * 0.23;
const addVAT = addTax.bind(null, 0.23); //1st param is this and we don't need it
console.log(addVAT(100));
console.log(addVAT(23));

const addTaxRate = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};

const addVAT2 = addTaxRate(0.23);
console.log(addVAT2(100));
console.log(addVAT2(23));
*/

///////////////////////////////////////
// Coding Challenge #1

/* 
Let's build a simple poll app!

A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. 
This data is stored in the starter object below.

Here are your tasks:

1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
  1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
        What is your favourite programming language?
        0: JavaScript
        1: Python
        2: Rust
        3: C++
        (Write option number)
  
  1.2. Based on the input number, update the answers array. For example, if the option is 3, increase the value AT POSITION 3 of the array by 1. 
    Make sure to check if the input is a number and if the number makes sense (e.g answer 52 wouldn't make sense, right?)
2. Call this method whenever the user clicks the "Answer poll" button.
3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), 
  which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log(). 
  This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1". 
4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

HINT: Use many of the tools you learned about in this and the last section 😉

BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do NOT put the arrays in the poll object! So what shoud the this keyword look like in this situation?

BONUS TEST DATA 1: [5, 2, 3]
BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]

GOOD LUCK 😀
*/
/*
const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  // This generates [0, 0, 0, 0]. More in the next section 😃
  answers: new Array(4).fill(0),
  registerNewAnswer() {
    // let promptText = this.question;
    // for (const option of this.options) promptText += '\n' + option;
    // promptText += '\n (Write the option number)';
    // const answer = Number(prompt(promptText));
    const answer = Number(
      prompt(
        `${this.question}\n${this.options.join('\n')}\n(Write option number)`
      )
    );
    if (typeof answer === 'number' && answer >= 0 && answer <= 3) {
      this.answers[answer]++;
    } else {
      alert('Wrong answer');
    }
    this.displayResults('array');
    this.displayResults('string');
  },

  displayResults(type = 'array') {
    if (type == 'string') {
      console.log(`Poll results are ${this.answers.join(', ')}`);
    } else {
      console.log(this.answers);
    }
  },
};

document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll));

poll.displayResults.call({ answers: [5, 2, 3] }, 'string');
poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] }, 'string');
poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] });
*/
/* 
// Immediately Invoked Function Expressions (IIFE)
//Must be in paratesis to avoid compile error
(function () {
  console.log('this will never execute again');
  //() to call it
})();

(() => console.log('this will also never execute again'))();

(function () {
  console.log('this will never execute again');
  const isPrivate = 23;
})();
//Cannot access IsPrivate outside of the function scope
//console.log(isPrivate);
{
  const isPrivate = 23;
  var notPrivate = 46;
}
//Cannot access IsPrivate outside of the block scope
//console.log(isPrivate);
console.log(notPrivate);
 */

//
//Closure
/*
const secureBooking = function () {
  let passengerCount = 0;
  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
};

const booker = secureBooking();
//Booker has access to the variable (passengerCount) of scope where the booker was created
booker();
booker();
booker();

console.dir(booker);
*/

/* //still closure
//Example 1
let f;

const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};

const h = function () {
  const b = 777;
  f = function () {
    console.log(b * 2);
  };
};
g();
f();
console.dir(f);

h(); //Re-assigning f function
f();
console.dir(f);

//Example 2 timer
const boardPassengers = function (n, wait) {
  const perGroup = n / 3;

  setTimeout(function () {
    console.log(`We are now boarding all ${n}`);
    console.log(`There are 3 groups, each with ${perGroup} passegers`);
  }, wait * 1000);

  console.log(`Will start boarding in ${wait} second`);
};

//The perGroup variable used will be the closure one
const perGroup = 1000;
boardPassengers(180, 3);
 */

///////////////////////////////////////
// Coding Challenge #2

/* 
This is more of a thinking challenge than a coding challenge 🤓

Take the IIFE below and at the end of the function, attach an event listener 
that changes the color of the selected h1 element ('header') to blue, each time
 the BODY element is clicked. Do NOT select the h1 element again!

And now explain to YOURSELF (or someone around you) WHY this worked! Take all the time you need. Think about WHEN exactly the callback function is executed, and what that means for the variables involved in this example.

GOOD LUCK 😀
*/

(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';

  const body = document.querySelector('body');
  body.addEventListener('click', function () {
    header.style.color = 'blue';
  });
})();
