'use strict';

/*
const calcAge = function (birthYear) {
  console.log(this);
};

function calcAge2(birthYear) {
  console.log('delcatration', this);
}

const calcAge3 = birthYear => {
  console.log('arrow', this);
};

console.log(this);
calcAge(1991);
calcAge2(1991);
calcAge3(1982);
*/

// const jonas = {
//   year: 1989,
//   calcAge: function (birthYear) {
//     console.log(this);
//     console.log(2037 - this.year);
//   },
//   calcAge3: birthYear => {
//     console.log('arrow', this);
//   },
// };

// jonas.calcAge();
// //jonas.calcAge3();

// const mathilda = {
//   year: 2017,
// };

// //method borrowing
// mathilda.calcAge = jonas.calcAge;
// mathilda.calcAge(); //this is mathilda

// const f = jonas.calcAge; //this is undefined
// f();

// //not a code block, just object literal
// const jonas = {
//   firstName: 'Jonas',
//   year: 1989,
//   calcAge: function (birthYear) {
//     console.log(this);
//     console.log(2037 - this.year);

//     //This is undefined Solution 1, pre ES6 solution
//     const self = this; //self or that
//     const isMillenial = function () {
//       console.log('isMilenial this', this);
//       //console.log(this.year >= 1981 && this.year <= 1996);
//       console.log('isMilenial self', self);
//       console.log(self.year >= 1981 && self.year <= 1996);
//     };
//     //regular function call: this is undefined
//     isMillenial();
//     //This is undefined Solution 2
//     const isMillenial2 = () => {
//       console.log('isMilenial2 this', this);
//       console.log(this.year >= 1981 && this.year <= 1996);
//     };
//     //Arrow function use is parent scope this
//     isMillenial2();
//   },
//   //this is from the parent scope wich is Globals (Window)
//   greet: () => {
//     console.log('greet', this);
//     console.log(`Hey ${this.firstName}`);
//   },
//   greet2: function () {
//     console.log('greet2', this);
//     console.log(`Hey ${this.firstName}`);
//   },
// };

// var firstName = 'Henrietta'; //global constext variable
// jonas.greet();
// jonas.greet2();

//jonas.calcAge();

// //Arguments keyword
// const addExpr = function (a, b) {
//   console.log(arguments);
//   console.log(arguments[0]);
//   return a + b;
// };
// addExpr(2, 5);
// addExpr(2, 5, 'test');
// addExpr(); //!!!!!!

// //Arrow funciton no arguments
// const addArrow = (a, b) => {
//   //console.log(arguments);
//   return a + b;
// };
// addArrow(2, 5);

// let age = 30;
// let oldAge = age;
// age = 31;
// console.log(`age: ${age}, oldAge: ${oldAge}`);

// const me = {
//   name: 'Jonas',
//   age: 30,
// };

// const friend = me;
// friend.age = 27;
// console.log(`friend: ${friend.age}, me: ${me.age}`);

//reference type
const jessica = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
};
const marriedJessica = jessica;
marriedJessica.lastName = 'Davis';
//Same reference both point to Davis
console.log(marriedJessica, jessica);

//coping object
const jessica2 = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
  family: ['Alice', 'Bob'],
};

//Merge 2 object into a new one
const jessicaCopy = Object.assign({}, jessica2);
jessicaCopy.lastName = 'Davis';
console.log(jessicaCopy, jessica2);
/*Object.assign does work only on the first level (shallow copy). If there is an object inside the object
the inner object won't be copied. It reference the same
*/
jessicaCopy.family.push('Antoine');
//Fmily is still a reference, so it change both
console.log(jessicaCopy, jessica2);
