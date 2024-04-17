'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2024-04-13T17:01:17.194Z',
    '2024-04-14T23:36:17.929Z',
    '2024-04-15T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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

/////////////////////////////////////////////////
// Functions
const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const dayPassed = calcDaysPassed(new Date(), date);
  if (dayPassed === 0) return 'Today';
  if (dayPassed === 1) return 'Yesterday';
  if (dayPassed <= 7) return `${dayPassed} days ago`;

  // const day = `${date.getDate()}`.padStart(2, 0);
  // const month = `${date.getMonth() + 1}`.padStart(2, 0);
  // const year = date.getFullYear();
  //return `${day}/${month}/${year}`;
  return new Intl.DateTimeFormat(locale).format(date);
};

const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date, acc.locale);
    const formattedMov = formatCur(mov, acc.locale, acc.currency);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
    <div class="movements__date">${displayDate}</div>
    <div class="movements__value">${formattedMov}</div>
      </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);

  const formattedBalance = formatCur(acc.balance, acc.locale, acc.currency);

  labelBalance.textContent = `${formattedBalance}`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCur(incomes, acc.locale, acc.currency);

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + Math.abs(mov), 0);
  labelSumOut.textContent = formatCur(out, acc.locale, acc.currency);

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatCur(interest, acc.locale, acc.currency);
};

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
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

const startLogOutTimer = function () {
  const tick = function () {
    //Call timeout every second
    //const timer = setInterval(function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
    //Print remining time to UI
    labelTimer.textContent = `${min},${sec}`;

    //When the timer expire stop time an logout use
    if (time === 0) {
      clearInterval(timer);
      containerApp.style.opacity = 0;
      labelWelcome.textContent = 'Log in to get started';
    }
    time--;
  };
  //Set time to 5 min.
  let time = 300; //seconds
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};

const resetTimer = function () {
  if (timer) clearInterval(timer);
  timer = startLogOutTimer();
};

///////////////////////////////////////
let currentAccount, timer;

///////////////////////////////////////
// Event handlers
btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    const now = new Date();
    // const day = `${now.getDate()}`.padStart(2, 0);
    // const month = `${now.getMonth() + 1}`.padStart(2, 0);
    // const year = now.getFullYear();
    // const hour = now.getHours();
    // const min = `${now.getMinutes()}`.padStart(2, 0);
    // labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric', //'long',
      year: 'numeric',
      //weekday: 'long',
    };
    //const local = navigator.language;
    //labelDate.textContent = new Intl.DateTimeFormat(local, options).format(now);
    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.local,
      options
    ).format(now);

    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur(); //remove focus

    //Timer
    resetTimer();
    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    //Add transfert date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);
    resetTimer();
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  //We want only whole number as loan
  const amount = Math.floor(inputLoanAmount.value); //Round down

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(function () {
      // Add movement
      currentAccount.movements.push(amount);
      //Add loan date
      currentAccount.movementsDates.push(new Date().toISOString());

      // Update UI
      updateUI(currentAccount);
    }, 2500);
  }
  inputLoanAmount.value = '';
  resetTimer();
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

/* 
console.log(23 === 23.0);

//Base 10 - 0 to 10
//Binary Base 2 - 0 to 1
console.log(0.1 + 0.2); //-> 0.30000000000000004!!
console.log(0.1 + 0.2 == 0.3); //False!!

//Conversion
console.log(Number('23'));
console.log(+'23');

//Parsing
console.log(Number.parseInt('30px', 10)); // -> 30
console.log(Number.parseInt(' 30px ')); // -> 30
console.log(Number.parseInt('e23')); // -> NaN

console.log(Number.parseInt('2.5rem')); //-> 2
console.log(Number.parseFloat('2.5rem')); //-> 2.5

//Chack if value is NaN
console.log(Number.isNaN(20)); //False it is a number
console.log(Number.isNaN('20')); //False it is a number
console.log(Number.isNaN(+'20X')); //True this is not a number
console.log(Number.isNaN(23 / 0)); //False, infinite is a number

//Checking if a value is a number
console.log(Number.isFinite(20)); //true it is a number
console.log(Number.isFinite('20')); //false not a number
console.log(Number.isFinite(+'20X')); //false
console.log(Number.isFinite(23 / 0)); //false

//checking if it is a Integer
console.log(Number.isInteger(23)); //true
console.log(Number.isInteger(23.0)); //true
console.log(Number.isInteger(23 / 0)); //False
 */

/* 
console.log(5 ** 5); //25
console.log(Math.sqrt(25)); //Square root 5
console.log(25 ** (1 / 2)); //Square root
console.log(25 ** (1 / 3)); //Cubic root

console.log(Math.max(5, 18, 23, 11, 2)); //23
console.log(Math.max(5, 18, '23', 11, 2)); //convert, 23
console.log(Math.max(5, 18, '23px', 11, 2)); //NaN, Doesn't parse!!

console.log(Math.min(5, 18, 23, 11, 2));

console.log(Math.PI * Number.parseFloat('10ps') ** 2);

console.log(Math.trunc(Math.random() * 6) + 1);

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min) + 1) + min;
// 0...1 -> 0...(max - min) -> min...max
console.log(randomInt(10, 20));

//Rounding Integer
//Nearest integer
console.log(Math.round(23.3)); //23
console.log(Math.round(23.9)); //24
//always Round up
console.log(Math.ceil(23.3)); //24
console.log(Math.ceil(23.9)); //24
//always Round down
console.log(Math.floor(23.3)); //23
console.log(Math.floor('23.9')); //23

//Truncating the decimal
console.log(Math.trunc(23.3)); //23

console.log(Math.trunc(-23.3)); //-23
console.log(Math.floor(-23.3)); //24

//Rounding decimal
console.log((2.7).toFixed(0)); //'3'
console.log((2.7).toFixed(3)); //'2.700'
console.log((2.345).toFixed(2)); //'2.35'
console.log(+(2.345).toFixed(2)); //2.34
 */

/*
//------ Remainder, %
console.log(5 % 2); //1
console.log(8 % 3); //2
console.log(6 % 2); //0

const isEven = n => n % 2 === 0;
console.log(isEven(8)); //true
console.log(isEven(23)); //flase
console.log(isEven(514)); //true

labelBalance.addEventListener('click', function () {
  [...document.querySelectorAll('.movements__row')].forEach(function (row, i) {
    //0,2,4,6
    if (i % 2 === 0) row.style.backgroundColor = 'orangered';
    //0,3,6,9
    if (i % 3 === 0) row.style.backgroundColor = 'blue';
    //0,3,6,9
  });
});
*/
/* 
//Numeric separator
//const diameter = 287460000000;
const diameter = 287_460_000_000;
console.log(diameter);

const priceCents = 345_99;
console.log(priceCents);

const PI = 3.14_15;
//not alllowed 3._1415 _3._1415 3._1415_

console.log(Number('230_000')); // => no a number
console.log(parseInt('230_000')); // => 230
 */
/* /
//-----
//BigInt, ES2020

//Bigest number
console.log(2 ** 53 - 1);
console.log(Number.MAX_SAFE_INTEGER);
console.log(2 ** 53 + 1);
console.log(2 ** 53 + 2);
//3 and 4 give the same result
console.log(2 ** 53 + 3);
console.log(2 ** 53 + 4);

console.log(5464168484654168489486489864654687894);
console.log(5464168484654168489486489864654687894n); //BigInt
console.log(BigInt(54641654));

//Operatioons
console.log(10000n + 10000n);
console.log(10000n * 10000n);

const huge = 155645456456156165165151561n;
const num = 23;
//console.log(huge * num); //-> TypeError: Cannot mix BigInt and other types, use explicit conversions
//console.log(Math.sqrt(16n)); // conversion errro

console.log(20n > 15); //Works
console.log(20n === 20); //-> false, no type coersion on ===
console.log(20n == 20); //-> true

console.log(huge + ' is really a big number');

//divisions
console.log(10n / 3n); //Return the bigint, truncat the decimal
console.log(10 / 3);
*/

//----------- date time
/*
//Create a date
const now = new Date();
console.log(now);

console.log(new Date('Aug 02 2020 18:04:41'));
console.log(new Date('December 24, 2015'));
console.log(new Date(account1.movementsDates[0]));

console.log(new Date(2037, 10, 19, 15, 23, 5)); //month is 0 base 10 = november
console.log(new Date(2037, 10, 33)); //auto cerrect

//Using timestamp
console.log(new Date(0));
console.log(new Date(3 * 24 * 60 * 60 * 1000)); //3 days in millisecond
*/
/* 
//Working with dates
const future = new Date(2037, 10, 19, 15, 23);
console.log(future);
console.log(future.getFullYear()); //do not use getYear
console.log(future.getMonth()); //still 0 based
console.log(future.getDate()); //=> day of the month
console.log(future.getDay()); //=> day of the week
console.log(future.getHours());
console.log(future.getMinutes());
console.log(future.getSeconds());
console.log(future.toISOString());

console.log(future.getTime()); //-> timestamp
console.log(new Date(2142274980000));

console.log(Date.now()); //current timestamp

future.setFullYear(2040);
console.log(future);
 */

/*
//When converting date to number it convert to timestamp
const future = new Date(2037, 10, 19, 15, 23);
console.log(+future);

const calcDaysPassed = (date1, date2) =>
  Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);

const days1 = calcDaysPassed(new Date(2037, 3, 4), new Date(2037, 3, 14));
console.log(days1);
*/
/* 
const num = 3884764.23;
console.log('US:', new Intl.NumberFormat('en-US').format(num));
console.log('Germany:', new Intl.NumberFormat('de-DE').format(num));
console.log('Syria:', new Intl.NumberFormat('ar-SY').format(num));
console.log(
  'Browser:',
  navigator.language,
  new Intl.NumberFormat(navigator.language).format(num)
);

const options = {
  style: 'unit',
  //unit: 'mile-per-hour',
  unit: 'celsius',
  //useGrouping: false,
};
console.log('US:', new Intl.NumberFormat('en-US', options).format(num));
console.log(
  'Browser:',
  navigator.language,
  new Intl.NumberFormat(navigator.language, options).format(num)
);

const options2 = {
  style: 'percent',
};
console.log('US:', new Intl.NumberFormat('en-US', options2).format(num));
console.log(
  'Browser:',
  navigator.language,
  new Intl.NumberFormat(navigator.language, options2).format(num)
);

const options3 = {
  style: 'currency',
  currency: 'EUR',
};
console.log('US:', new Intl.NumberFormat('en-US', options3).format(num));
console.log(
  'Browser:',
  navigator.language,
  new Intl.NumberFormat(navigator.language, options3).format(num)
);
 */
/* 
//Execute once
setTimeout(
  () => console.log('Here is your pizza'),
  3000 //millisecond
);

const ingredients = ['olives', 'mushroom']; //, 'spinach'];
const pizzaTimer = setTimeout(
  (ing1, ing2) => console.log(`Here is your pizza with ${ing1} and ${ing2}`),
  3000, //millisecond
  ...ingredients
);
console.log('Waiting');

if (ingredients.includes('spinach')) {
  clearTimeout(pizzaTimer);
}

//Execute multiple time
setInterval(function () {
  const now = new Date();
  console.log(now);
}, 1000);
 */
