'use strict';

//---- Constructor funciton and New
/* 
//Constructor function always start with an Uppercase
//Arrow function cannot be use, because it doesn't have it's own this keyword
const Person = function (firstName, birthYear) {
  //Instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;

  //Never do this
  //Neve create a mehtods in the constructor function, willl have a copy for eacch instance
  //   this.calcAge = function () {
  //     console.log(2037 - this.birthYear);
  //   };
};

const jonas = new Person('Jonas', 1991);
console.log(jonas);

//Constructor:
//1. New empty object is created
//2. The fucntion is called, this = {}
//3. {} linked to prototype
//4. fucntion automaticaly return the object (this)

const mathilda = new Person('Mathilda', 2017);
const jack = new Person('Jack', 1975);
console.log(mathilda, jack);

console.log(jonas instanceof Person);
// const jay = 'jay';
// console.log(jay instanceof Person);
 */
//------- Prototype
/* console.log(Person.prototype);
//Prototype of the Person constructor function. One copy for all instance
Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};
console.log(Person.prototype);

jonas.calcAge();
mathilda.calcAge();

console.log(jonas.__proto__);
console.log(jonas.__proto__ === Person.prototype);

console.log(Person.prototype.isPrototypeOf(jonas));
console.log(Person.prototype.isPrototypeOf(jack));
console.log(Person.prototype.isPrototypeOf(Person)); //False

console.log(jonas);

//Proerty of the prototype
Person.prototype.species = 'Homo Sapiens';
console.log(jonas.species, jack.species);

console.log(jonas.hasOwnProperty('firstName'));
console.log(jonas.hasOwnProperty('species'));

console.log(jonas.__proto__);
//Object.prototype (top of prototype chain)
console.log(jonas.__proto__.__proto__);
console.log(jonas.__proto__.__proto__.__proto__);

console.log(Person.prototype.constructor);

const arr = [3, 65, 9, 3, 9]; // or new Array
console.log(arr.__proto__);
console.log(arr.__proto__ === Array.prototype);
console.log(arr.__proto__.__proto__);
console.log(arr.__proto__.__proto__.__proto__);

//Not a good idea to add methods to the prototype
Array.prototype.unique = function () {
  return [...new Set(this)];
};
console.log(arr.unique());

const h1 = document.querySelector('h1');
console.dir(h1); //Long protoype chain
console.dir(x => x + 1);
 */

///////////////////////////////////////
// Coding Challenge #1

/* 
1. Use a constructor function to implement a Car. A car has a make and a speed property. 
    The speed property is the current speed of the car in km/h;
2. Implement an 'accelerate' method that will increase the car's speed by 10, and 
    log the new speed to the console;
3. Implement a 'brake' method that will decrease the car's speed by 5, 
    and log the new speed to the console;
4. Create 2 car objects and experiment with calling 'accelerate' and 'brake'
     multiple times on each of them.

DATA CAR 1: 'BMW' going at 120 km/h
DATA CAR 2: 'Mercedes' going at 95 km/h

GOOD LUCK 😀
*/
/* 
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(this.speed);
};
Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(this.speed);
};

const bmw = new Car('BMW', 120);
const mercedes = new Car('Mercedes', 95);

bmw.accelerate();
bmw.accelerate();
bmw.brake();
mercedes.accelerate();
mercedes.brake();
 */

/*
//----------- ES6 classes
// class expretion
//const PersonCl = class {};
 
//class decraration
class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  //instance methods will be on the prototype
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet = function () {
    console.log(`Hey ${this.fullName}`);
  };

  get age() {
    return 2037 - this.birthYear;
  }

  //Property tht already exist
  get fullName() {
    return this._fullName;
  }
  set fullName(name) {
    if (name.includes(' ')) {
      this._fullName = name;
    } else {
      alert(`${name} is not a full name`);
    }
  }
  //Static methods
  static hey = function () {
    console.log('Hey there!');
    console.log(this);
  };
}


//const walter = new PersonCl('Walter', 1965);
const jessica = new PersonCl('Jessic Davis', 1996);
console.log(jessica);
jessica.calcAge();
console.log(jessica.age);

console.log(jessica.__proto__ === PersonCl.prototype);

// PersonCl.prototype.greet = function () {
//   console.log(`Hey ${this.firstName}`);
// };
jessica.greet();
 */
//1. classses are NOT hoisted (can't use before declaration)
//2. Class are first-class citizen (threated like variables)
//3. Classes are executed in strict mode

//---- Getters and Setters
/* 
const account = {
  owner: 'jonas',
  movements: [200, 530, 120, 300],

  get latest() {
    return this.movements.slice(-1).pop();
  },

  set latest(mov) {
    this.movements.push(mov);
  },
};

console.log(account.latest); //No parantesis like a property
account.latest = 50; //not account.latest(50);
console.log(account.movements);

//Static methods
Array.from(document.querySelectorAll('h1'));
//[1, 2, 3].from(); //Doesn't work the fuction is not on the prototype but the class constructor methods (class function)

const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Person.hey = function () {
  console.log('Hey there!');
  console.log(this);
};

Person.hey();
const jonas = new Person('jonas', 1991);
//jonas.hey(); //Error nut a function

PersonCl.hey();
 */

/* 
//---Object.create()
//Prototype
const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  //Can be any name, not a constructor
  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto); //Create from prototype
console.log(steven);

steven.name = 'Steven';
steven.birthYear = 2002;
steven.calcAge();

console.log(steven.__proto__);
console.log(steven.__proto__ === PersonProto);

const sarah = Object.create(PersonProto);
sarah.init('Sarah', 1979);
sarah.calcAge();
 */

///////////////////////////////////////
// Coding Challenge #2

/* 
1. Re-create challenge 1, but this time using an ES6 class;
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6);
3. Add a setter called 'speedUS' which sets the current speed in mi/h 
    (but converts it to km/h before storing the value, by multiplying the input by 1.6);
4. Create a new car and experiment with the accelerate and brake methods,
    and with the getter and setter.

DATA CAR 1: 'Ford' going at 120 km/h

GOOD LUCK 😀
*/
/* 
class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speedUS) {
    this.speed = speedUS * 1.6;
    console.log(this.speed, speedUS);
  }

  accelerate() {
    this.speed += 10;
    console.log(this.speed);
  }

  brake = function () {
    this.speed -= 5;
    console.log(this.speed);
  };
}

const ford = new CarCl('Ford', 120);
ford.accelerate();
ford.brake();
console.log(ford.speedUS);

const datsun = new CarCl('Datsun', 40);
datsun.speedUS = 60;
 */

//--- Inheritance with function constructor
/*
const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};
Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

const Student = function (firstName, birthYear, course) {
  Person.call(this, firstName, birthYear); //need call to set the this keyword of the function Person
  this.course = course;
};

//Linking prototype
//need to be done before adding mehtods
Student.prototype = Object.create(Person.prototype);

Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const mike = new Student('Mike', 2020, 'Computer science');
console.log(mike);
mike.introduce();
mike.calcAge();

console.log(mike.__proto__);
console.log(mike.__proto__.__proto__);

console.log(mike instanceof Student);
console.log(mike instanceof Person);
console.log(mike instanceof Object);

Student.prototype.constructor = Student;
console.dir(Student.prototype.constructor);
*/

//
//--- Inheritance with ES6 Classes
///////////////////////////////////////
// Coding Challenge #3

/* 
1. Use a constructor function to implement an Electric Car (called EV) as a
     CHILD "class" of Car. Besides a make and current speed, the EV also has
     the current battery charge in % ('charge' property);
2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and 
    sets the battery charge to 'chargeTo';
3. Implement an 'accelerate' method that will increase the car's speed by 20, 
    and decrease the charge by 1%. Then log a message like this: 
    'Tesla going at 140 km/h, with a charge of 22%';
4. Create an electric car object and experiment with calling 'accelerate', 
    'brake' and 'chargeBattery' (charge to 90%). Notice what happens when 
    you 'accelerate'! HINT: Review the definiton of polymorphism 😉

DATA CAR 1: 'Tesla' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/
/* 
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};

const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};

//Link prototype
EV.prototype = Object.create(Car.prototype);

EV.prototype.chargeBattery = function (changeTo) {
  this.charge = changeTo;
  console.log(`${this.make} has a charge of ${this.charge}%`);
};

//override Car accelerate methods
EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge -= 1;
  console.log(
    `${this.make} is going at ${this.speed} km/h, with a charge of ${this.charge}%`
  );
};

const tesla = new EV('Tesla', 120, 23);
tesla.chargeBattery(90);
tesla.accelerate();
console.log(tesla);
 */

/*
//--- Inheritance between "Classes": ES6 Classes
//const PersonCl = class {};
class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet = function () {
    console.log(`Hey ${this.fullName}`);
  };

  get age() {
    return 2037 - this.birthYear;
  }

  //Property tht already exist
  get fullName() {
    return this._fullName;
  }
  set fullName(name) {
    if (name.includes(' ')) {
      this._fullName = name;
    } else {
      alert(`${name} is not a full name`);
    }
  }

  static hey = function () {
    console.log('Hey there!');
    console.log(this);
  };
}

class StudentCl extends PersonCl {
  //If ther is no new parameter we don't need this constructor, super is call automaticaly
  constructor(fullName, birthYear, course) {
    //Call the constructor of the parent classes, need to append first
    super(fullName, birthYear);
    this.course = course;
  }

  introduce() {
    console.log(`My name is ${this.fullName} and I study ${this.course}`);
  }

  //Overrid calcAge
  calcAge() {
    console.log(
      `I'm ${
        2037 - this.birthYear
      } years old, but has a student I feel mor like ${
        2037 - this.birthYear + 10
      }`
    );
  }
}

//const martha = new StudentCl('Martha Jones', 2012); //use the parent consturctor, course will be undefined
const martha = new StudentCl('Martha Jones', 2012, 'Computer Science');
console.log(martha);
martha.introduce();
martha.calcAge();
*/

/*
//--- Inheritance between "Classes": Object.create
const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  //Can be any name, not a constructor
  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto); //Create from prototype

const StudentProto = Object.create(PersonProto);

StudentProto.init = function (firstName, birthYear, course) {
  PersonProto.init.call(this, firstName, birthYear);
  this.course = course;
};

StudentProto.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const jay = Object.create(StudentProto);
jay.init('Jay', 2010, 'Competer science');
jay.introduce();
jay.calcAge();
*/

/*
//----------------- Encapsulation

//--- Class field proposal. Not supported yet, Stage 3
//1. Public instance fields
//2. Private instance fields
//3. Public methods
//4. Private methods
//Alos static version
class Account {
  //Public fields
  locale = navigator.language;

  //Private fields
  #movements = [];
  #pin;

  constructor(owner, curency, pin) {
    this.owner = owner;
    this.curency = curency;
    //Protectd property, convention only still public
    //this._pin = pin;
    this.#pin = pin;
    //Protectd property, convention only still public
    //this._movements = [];
    //this.locale = navigator.language;

    console.log(`Thanks for opening account ${owner}`);
  }

  //3.Public methods
  getMovements() {
    return this.#movements;
  }

  deposit(amount) {
    acc1.#movements.push(amount);
    return this; //To permit mehotds chaining
  }

  withdraw(amount) {
    this.deposit(-amount);
    return this; //To permit mehotds chaining
  }

  //3.Public methods
  requestLoan(amount) {
    if ((this, this._approveLoan(amount))) {
      this.deposit(amount);
      console.log('Loan approved');
    }
    return this; //To permit mehotds chaining
  }

  static Helper() {
    console.log('account helper funxtion');
  }
  //4.Private methods, #. not supported
  //#approveLoan(amount) {
  //Protectd methods, convention only still public
  _approveLoan(amount) {
    return true;
  }
}

const acc1 = new Account('Jonas', 'EUR', 1111);

acc1.deposit(250);
acc1.withdraw(140);
acc1.requestLoan(1000);
console.log(acc1.getMovements()); //Can still do _movements

//console.log(acc1.#movements); -> errror

//---- Chaining methods
acc1.deposit(300).deposit(500).withdraw(35).requestLoan(25000).withdraw(4000);

console.log(acc1.getMovements());

*/

/*
//-----
//--- ES6 classes summary
class Person {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }
  calcAge() {
    console.log(2037 - this.birthYear);
  }
  greet = function () {
    console.log(`Hey ${this.fullName}`);
  };
  get age() {
    return 2037 - this.birthYear;
  }
  get fullName() {
    return this._fullName;
  }
  set fullName(name) {
    if (name.includes(' ')) {
      this._fullName = name;
    } else {
      alert(`${name} is not a full name`);
    }
  }
  static hey = function () {
    console.log('Hey there!');
    console.log(this);
  };
}

class Student extends Person {
  university = 'University of Lisbonne';
  #studyHours = 8;
  #course;
  static numSubjects = 10;

  constructor(fullName, birthYear, startYear, course) {
    super(fullName, birthYear);

    this.startYear = startYear;
    this.course = course;
  }

  introduce() {
    console.log(`I study ${this.#course} at ${this.university}`);
  }

  study(h) {
    this._makeCoffe();
    this.#studyHours += h;
  }

  //#makeCoffe() {
  _makeCoffe() {
    return 'Here is a coffe for you';
  }

  get testScore() {
    return this._testScore;
  }

  set testScore(score) {
    this._testScore = score <= 20 ? (score = 0) : score;
  }

  static printCuriculum() {
    console.log(`there are ${this.numSubjects} subjects`);
  }
}

const pierre = new Student('Pierre Trembly', 2001, 2020, 'Computer science');
*/

///////////////////////////////////////
// Coding Challenge #4

/* 
1. Re-create challenge #3, but this time using ES6 classes: create an 'EVCl' 
    child class of the 'CarCl' class
2. Make the 'charge' property private;
3. Implement the ability to chain the 'accelerate' and 'chargeBattery' methods
     of this class, and also update the 'brake' method in the 'CarCl' class. 
     They experiment with chining!

DATA CAR 1: 'Rivian' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/

class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(`${this.make} is going at ${this.speed} km/h`);
  }

  brake() {
    this.speed -= 5;
    console.log(`${this.make} is going at ${this.speed} km/h`);
    return this;
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

class EVCl extends CarCl {
  #charge;

  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }

  chargeBattery(changeTo) {
    this.#charge = changeTo;
    console.log(`${this.make} has a charge of ${this.#charge}%`);

    return this;
  }

  //override Car accelerate methods
  accelerate() {
    this.speed += 20;
    this.#charge -= 1;
    console.log(
      `${this.make} is going at ${this.speed} km/h, with a charge of ${
        this.#charge
      }%`
    );

    return this;
  }
}

const rivian = new EVCl('Rivian', 120, 23);
console.log(rivian);

rivian.accelerate(10).chargeBattery(10).brake(15);
console.log(rivian);
