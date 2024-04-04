'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

/* const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]); */

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

/* let arr = ['a', 'b', 'c', 'd', 'e'];
//Slice
console.log(arr.slice(2));
console.log(arr.slice(2, 4)); //Last index not include, return 2 3 position
console.log(arr.slice(-2));
console.log(arr.slice(1, -2));
//Shalow copy
console.log(arr.slice());
console.log([...arr]);

//Splice, mutate the array
console.log(arr.splice(2)); //return an remove the elements c,d,e
console.log(arr);

arr = ['a', 'b', 'c', 'd', 'e'];
arr.splice(-1); //remove the last element
console.log(arr);
arr.splice(1, 2); // is the delete count
console.log(arr);

//Reverse, mutate the array
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse());
console.log(arr2);

//Concat
arr = ['a', 'b', 'c', 'd', 'e'];
const letters = arr.concat(arr2);
console.log(letters);
console.log([...arr, ...arr2]);

//Join
console.log(letters.join('-'));
 */
/*
//at => ES2022
const arr = [23, 11, 64];
console.log(arr[0]);
console.log(arr.at(0));

console.log(arr[arr.length - 1]);
console.log(arr.slice(-1)[0]);
console.log(arr.at(-1));

console.log('Jonas'.at(0));
console.log('Jonas'.at(-1));
*/
/* 
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

//for (const movement of movements) {
for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i + 1} You deposited ${movement}`);
  } else {
    console.log(`Movement ${i + 1} You withdrew ${Math.abs(movement)}`);
  }
}
console.log('-------- ForEach ------');
// movements.forEach(function (movement) {
//   if (movement > 0) {
//     console.log(`You deposited ${movement}`);
//   } else {
//     console.log(`You withdrew ${Math.abs(movement)}`);
//   }
// });

movements.forEach(function (movement, index, array) {
  if (movement > 0) {
    console.log(`Movement ${index + 1} You deposited ${movement}`);
  } else {
    console.log(`Movement ${index + 1} You withdrew ${Math.abs(movement)}`);
  }
});
//Cannot use a break statemetn with foreach
 */

/* 
//Foreach on map
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

//Foreach on Set
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR']);
console.log(currenciesUnique);

currenciesUnique.forEach(function (value, key, map) {
  //The key is the same as value
  console.log(`${key}: ${value}`);
});
currenciesUnique.forEach(function (value, _, map) {
  //The key is the same as value
  console.log(`${value}: ${value}`);
});
 */

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

//
const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  //Use slice to get a copy of movments to avoid mutating it
  const sortedMovements = sort
    ? movements.slice().sort((a, b) => a - b)
    : movements;

  sortedMovements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__value">${mov} €</div>
      </div>
      `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
//displayMovements(account1.movements);

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((bal, mov) => bal + mov, 0);
  labelBalance.textContent = `${acc.balance} €`;
};
//calcDisplayBalance(account1.movements);

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes} €`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)} €`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      //console.log(arr);
      return int > 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest} €`;
};
//calcDisplaySummary(account1.movements);

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  //Dispaly movements
  displayMovements(currentAccount.movements);
  //Dsiplay balance
  calcDisplayBalance(currentAccount);
  //Display summary
  calcDisplaySummary(currentAccount);
};

//Events handler
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  //Prenvent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //Dsiplay UI and welcome message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;
    //Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputClosePin.blur(); //Loos the focus

    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  //Cleaning input field
  inputTransferAmount.value = '';
  inputTransferTo.value = '';
  //Validate
  if (
    amount > 0 &&
    receiverAcc &&
    amount <= currentAccount.balance &&
    receiverAcc?.username !== currentAccount.username
  ) {
    //Do the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    //Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);
  inputLoanAmount.value = '';

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    currentAccount.movements.push(amount);
    updateUI();
  }
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    currentAccount.username === inputCloseUsername.value &&
    currentAccount.pin === Number(inputClosePin.value)
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    //Remove account
    accounts.splice(index, 1);
    //Hide UI
    containerApp.style.opacity = 0;
  }
  //Cleaning input field
  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault;
  sorted = !sorted;
  displayMovements(currentAccount.movements, sorted);
});

///////////////////////////////////////
// Coding Challenge #1

/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's 
age, and stored the data into an array (one array for each). For now, they are just interested 
in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years 
old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, 
  not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that 
  copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult 
  ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/
/*
const checkDogs = function (dogsJulia, dogsKate) {
  //1
  //const dogsJuliaCorected = dogsJulia.slice(1, -2);
  const dogsJuliaCorected = dogsJulia.slice();
  dogsJuliaCorected.splice(0, 1);
  dogsJuliaCorected.splice(-2);
  //2
  const dogs = dogsJuliaCorected.concat(dogsKate);
  console.log(dogs);
  //3
  dogs.forEach(function (dog, i) {
    if (dog >= 3) {
      console.log(`dog number ${i + 1} is an adult, and is ${dog} old`);
    } else {
      console.log(`Dog number ${i + 1} is still a puppy 🐶`);
    }
  });
};

//4
checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);
*/

//-------------------- Map method
/*
const eurToUSD = 1.1;

// const movementsUSD = movements.map(function (mov) {
//   return mov * eurToUSD;
// });
const movementsUSD = movements.map(mov => mov * eurToUSD);
console.log(movements);
console.log(movementsUSD);

const movementUSDfor = [];
for (const mov of movements) {
  movementUSDfor.push(mov * eurToUSD);
}
console.log(movementUSDfor);

const movementsDescription = movements.map(
  (mov, i, arr) =>
    `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
      mov
    )}`
);
console.log(movementsDescription);
*/

/*
//----------- Filter mehtod
//return a boolean to know if we keep the element or not
// const deposits = movements.filter(function (mov, i, arr) {
//   return mov > 0;
// });
const deposits = movements.filter(mov => mov > 0);
console.log(movements);
console.log(deposits);

const withdrawals = movements.filter(mov => mov < 0);
console.log(withdrawals);

//-------------- Reduce method
const balance = movements.reduce(function (accumulator, mov, i, arr) {
  console.log(`Iteration ${i}: ${accumulator}`);
  return accumulator + mov;
}, 0); //0: the initial value of the accumulator
console.log(balance);

const balance2 = movements.reduce((acc, mov) => acc + mov, 0);
console.log(balance2);

//Maximum value
const max = movements.reduce(
  (acc, mov) => (mov > acc ? mov : acc),
  movements[0]
);
console.log(max);
*/

///////////////////////////////////////
// Coding Challenge #2

/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog 
ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'),
 and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years 
  old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as 
    keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from 
    other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/
/*
const calcAverageHumanAge = function (ages) {
  //1
  const humanAges = ages.map(dogAge =>
    dogAge <= 2 ? 2 * dogAge : 16 + dogAge * 4
  );
  console.log(`Human ages: ${humanAges}`);

  //2
  const adultDogs = humanAges.filter(age => age >= 18);
  console.log(`Adult dogs: ${adultDogs}`);

  //3
  const average =
    adultDogs.reduce((acc, age) => acc + age, 0) / adultDogs.length;
  return average;
};
//4
const average1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
console.log(average1);
const average2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
console.log(average2);
*/
/*
const eurToUsd = 1.1;
//Pipeline
const totalDepositUSD = movements
  .filter(mov => mov > 0)
  .map(mov => mov * eurToUsd)
  //Debuging the filter
  // .map((mov, i, arr) => {
  //   console.log(arr);
  //   return mov * eurToUsd;
  // })
  .reduce((acc, mov) => mov + acc);
console.log(totalDepositUSD);
*/

///////////////////////////////////////
// Coding Challenge #3

/* 
Rewrite the 'calcAverageHumanAge' function from the previous challenge, 
but this time as an arrow function, and using chaining!

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/
/*
const calcAverageHumanAge = ages =>
  ages
    .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter(age => age >= 18)
    .reduce((acc, age, i, arr) => acc + age / arr.length, 0);

const average1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
console.log(average1);
const average2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
console.log(average2);
*/

/*
//Find return the first element matching the condidions
const firstWithdrawal = movements.find(mov => mov < 0);
console.log(movements);
console.log(firstWithdrawal);

console.log(accounts);
let account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);

for (const acc of accounts) {
  if (acc.owner === 'Jessica Davis') account = acc;
}
console.log(account);
*/

/*
console.log(movements);
//If any value is equal to
console.log(movements.includes(-130));
console.log(movements.some(mov => mov === -130));

//Did we have deposit?
const anyDeposit = movements.some(mov => mov > 0);
console.log(anyDeposit);

//Every pass the test?
console.log(movements.every(mov => mov > 0));
console.log(account4.movements.every(mov => mov > 0));

const deposit = mov => mov > 0;
console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit));
*/

/*
//---------------Flat and FlatMap methods ES2019
const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat()); // [1, 2, 3, 4, 5, 6, 7, 8];

const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arrDeep.flat(2));

// const accountMovements = accounts.map(acc => acc.movements);
// console.log(accountMovements);
// const allMovements = accountMovements.flat();
// console.log(allMovements);
// const overalBalance = allMovements.reduce((acc, mov) => acc + mov, 0);
const overalBalance = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance);

//Flatmap, only 1 level deep
const overalBalance2 = accounts
  .flaMap(acc => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance2);
*/

/*
//--------------- Sorting
const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
//MUTATE original array
console.log(owners.sort());

///Numbers
console.log(movements);
//Sort base on string, convert to string then sort
console.log(movements.sort());

//a Curent, b next value
//Return < 0 a before b => keep order
//Return > 0 b before a => switch order
//Ascending
// movements.sort((a, b) => {
//   if (a > b) return 1;
//   if (a < b) return -1;
// });
movements.sort((a, b) => a - b);
console.log(movements);
//Descending
// movements.sort((a, b) => {
//   if (a > b) return -1;
//   if (a < b) return 1;
// });
movements.sort((a, b) => b - a);
console.log(movements);
*/
/* 
console.log([1, 2, 3, 4, 5, 6, 7]);
console.log(new Array(1, 2, 3, 4, 5, 6, 7));

//Empty array
//If we pass only 1 argument, will initialize an empty array
const x = new Array(7);
console.log(x); //[empty x 7]
console.log(x.map(() => 5)); //[empty x 7]

//Fill, mutate the array
//x.fill(1);
//console.log(x); //[1, 1, 1, 1, 1, 1];
x.fill(1, 3, 5); //3 begin, 5 end (not included)
console.log(x); //[empty x3, 1, 1, empty x2];

const arr = [1, 2, 3, 4, 5, 6, 7];
arr.fill(23, 4, 6); // [1, 2, 3, 4, 23, 23, 7]
console.log(arr);

//---------------- Array.from
const y = Array.from({ lemgth: 7 }, () => 1); //[];
console.log(y);

//the _ (not used) is the current position
const z = Array.from({ length: 7 }, (_, index) => index + 1); //[1, 2, 3, 4, 5, 6, 7])
console.log(z);

const dices = Array.from(
  { length: 100 },
  (_, i) => (i = Math.trunc(Math.random() * 6) + 1)
);
console.log(dices);

labelBalance.addEventListener('click', function () {
  //Populate a array form a node list
  //We cannot use array function on a node list, so convert to
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    //Mapin function parameter
    element => Number(element.textContent.replace('€', ''))
  );
  console.log(movementsUI);

  const movementsUI2 = [...document.querySelectorAll('.movements__value')].map(
    element => Number(element.textContent.replace('€', ''))
  );
  console.log(movementsUI2);
});
 */

////////
//Array methods practice
/* 
//1
//const bankDepositSum = accounts.map(acc => acc.movements).flat();
const bankDepositSum = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((sum, cur) => sum + cur, 0);

console.log(bankDepositSum);

//2
// const numDeposit1000 = accounts
//   .flatMap(acc => acc.movements)
//   .filter(mov => mov >= 1000).length;
const numDeposit1000 = accounts
  .flatMap(acc => acc.movements)
  .reduce((count, cur) => (cur >= 1000 ? ++count : count), 0); //cannot use count++

console.log(numDeposit1000);

let a = 10;
console.log(a++); //++ return the value before incrementing
console.log(a);

//3
const { deposits, withdrawals } = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sums, cur) => {
      //cur > 0 ? (sums.deposits += cur) : (sums.withdrawals += Math.abs(cur));
      sums[cur > 0 ? 'deposits' : 'withdrawals'] += cur;
      return sums;
    },
    { deposits: 0, withdrawals: 0 }
  );
console.log(deposits, withdrawals);

//4
//this is a nice title -> This Is a Nice Title
const convertTitleCase = function (title) {
  const capitalize = str => str[0].toUpperCase() + str.slice(1);
  const exception = ['a', 'an', 'and', 'the', 'but', 'or', 'on', 'in', 'width'];

  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word => (exception.includes(word) ? word : capitalize(word)))
    .join(' ');
  return capitalize(titleCase);
};

console.log(convertTitleCase('this is a nice title'));
console.log(convertTitleCase('this is a LONG title but not too long'));
console.log(convertTitleCase('and there is another tilte with an EXAMPLE'));
 */

///////////////////////////////////////
// Coding Challenge #4

/* 
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating
too much or too little. Eating too much means the dog's current food portion is larger 
than the recommended portion, and eating too little is the opposite. Eating an okay 
amount means the dog's current food portion is within a range 10% above and 10% below 
the recommended portion (see hint).

1. Loop over the array containing dog objects, and for each dog, calculate the recommended
 food portion and add it to the object as a new property. Do NOT create a new array, 
 simply loop over the array. 
  Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, 
  and the weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too little. 
  HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners 
  array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch')
  and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
4. Log a string to the console for each array created in 3., like this: 
  "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's 
  dogs eat too little!"
5. Log to the console whether there is any dog eating EXACTLY the amount of food that 
  is recommended (just true or false)
6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food 
  (try to reuse the condition used in 6.)
8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending 
   order (keep in mind that the portions are inside the array's objects)

HINT 1: Use many different tools to solve these challenges, you can use the summary
   lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: 
  current > (recommended * 0.90) && current < (recommended * 1.10). Basically, 
  the current portion should be between 90% and 110% of the recommended portion.

TEST DATA:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] }
];

GOOD LUCK 😀
*/

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

//1
dogs.forEach(function (dog) {
  dog.recFood = Math.trunc(dog.weight ** 0.75 * 28);
});
console.log(dogs);

//2
const sarahDog = dogs.find(mov => mov.owners.includes('Sarah'));
if (sarahDog.curFood > sarahDog.recFood)
  console.log("Sarah's dog eat too much");
else if (sarahDog.curFood < sarahDog.recFood)
  console.log("Sarah's dog eat too little");
else console.log("Sarah's dog eat ok");

//3
const ownersEatTooMuch = dogs
  .filter(dog => dog.curFood > dog.recFood)
  .flatMap(dog => dog.owners);
console.log(ownersEatTooMuch);
const ownersEatTooLittle = dogs
  .filter(dog => dog.curFood < dog.recFood)
  .flatMap(dog => dog.owners);
console.log(ownersEatTooLittle);

//4
console.log(`${ownersEatTooMuch.join(' and ')}'s dogs eat too much`);
console.log(`${ownersEatTooLittle.join(' and ')}'s dogs eat too little`);

//5. Log to the console whether there is any dog eating EXACTLY the amount of food that
//  is recommended (just true or false)
console.log(dogs.some(dog => dog.curFood === dog.recFood));

//6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
//current > (recommended * 0.90) && current < (recommended * 1.10).
const checkEatingOk = dog =>
  dog.curFood > dog.recFood * 0.9 && dog.curFood < dog.recFood * 1.1;

console.log(dogs.some(checkEatingOk));

//7. Create an array containing the dogs that are eating an OKAY amount of food
//  (try to reuse the condition used in 6.)
const eatingOkDogs = dogs.filter(checkEatingOk);
console.log(eatingOkDogs);

//8. Create a shallow copy of the dogs array and sort it by recommended food portion
//in an ascending order (keep in mind that the portions are inside the array's objects)
const dogsSorted = dogs.slice().sort((a, b) => a.recFood - b.recFood);
console.log(dogsSorted);
