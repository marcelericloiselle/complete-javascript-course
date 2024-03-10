'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
const openingHours = {
  [weekdays[3]]: {
    open: 12,
    close: 22,
  },
  fri: {
    open: 11,
    close: 23,
  },
  [`day-${2 + 4}`]: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],
  //Pre ES6
  //openingHours: openingHours,
  //ES6 enhance object literal
  openingHours, //because it it the same name as the variable name
  //order: function (starterindex, mainindex) {
  order(starterindex, mainindex) {
    return [this.starterMenu[starterindex], this.mainMenu[mainindex]];
  },
  orderDelivery: function ({
    starterIndex = 1,
    mainIndex = 0,
    time = '20:00',
    address,
  }) {
    console.log(starterIndex, mainIndex, time, address);
  },
  orderPasta: function (ing1, ing2, ing3) {
    console.log(`Here you pasta with ${ing1}, ${ing2}, ${ing3}`);
  },
  //must have at least 1 ingredients
  orderPizza: function (mainIngredient, ...othersIngredients) {
    console.log(mainIngredient);
    console.log(othersIngredients);
  },
};

console.log(restaurant);

/* 
//--- Destructuring object
const { name, openingHours, categories } = restaurant;
console.log(name, openingHours, categories);

const {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant;
console.log(restaurantName, hours, tags);

//Defaults values
const { menu = [], starterMenu: starters = [] } = restaurant;
console.log(menu, starters);

//Mutating varaibles
let a = 111;
let b = 999;
const obj = {
  a: 23,
  b: 7,
  c: 14,
};

//Error because we cannot assign a block of code
//{a, b} = obj;
({ a, b } = obj);
console.log(a, b);

const {
  fri: { open, close },
} = openingHours;
console.log(open, close);

const {
  fri: { open: o, close: c },
} = openingHours;
console.log(o, c);

restaurant.orderDelivery({
  time: '22:30',
  address: '1355 de Dieppe',
  mainIndex: 2,
  starterIndex: 2,
});
restaurant.orderDelivery({
  address: '1355 de Dieppe',
  starterIndex: 2,
});
 */

//Spread operator
/* const arr = [7, 8, 9];
const badNewArr = [1, 2, arr[0], arr[1], arr[2]];
console.log(badNewArr);
const newArr = [1, 2, ...arr];
console.log(newArr);
console.log(...newArr);

const newMenu = [...restaurant.mainMenu, 'Gnocci'];
console.log(newMenu);

//Copy array (shallow copy)
const mainMenuCopy = [...restaurant.mainMenu];
//Join 2 array
const allMenu = [...mainMenuCopy, ...restaurant.starterMenu];
console.log(allMenu);

//Iterable: array, string, map, set but not Object
const str = 'Jonas';
const letters = [...str, ' ', 'S.'];
console.log(letters);
 */

/* const ingredients = [
  prompt("Let's make pasta. Ingredienat 1?"),
  prompt('Ingredienat 2?'),
  prompt('Ingredienat 3?'),
];
restaurant.orderPasta(...ingredients);
*/

// //Objects (ES2018)
// const newRestaurant = { foundedIn: '1885', ...restaurant, founder: 'Guseppe' };
// console.log(newRestaurant);

// const restaurantCopy = { ...restaurant };
// restaurantCopy.name = 'Ristorante Roma';
// console.log(restaurant.name, restaurantCopy.name);
/* 
//Spread operator because  it is on the right size ot the equal sing
const arr = [1, 2, ...[4, 3]];

//---- REST in destructuring

//REST syntax, left side of the equal sign
const [a, b, ...others] = [1, 2, 3, 4, 5, 6, 7];
console.log(others); //[3, 4, 5, 6, 7];]

//No skiped data included, always the las element of the array assignement
const [pizza, , risoto, ...otherFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];
console.log(pizza, risoto, otherFood);

//Objects

const openingHours = {
  thu: {
    open: 12,
    close: 22,
  },
  fri: {
    open: 11,
    close: 23,
  },
  sat: {
    open: 0, // Open 24 hours
    close: 24,
  },
};
const { sat, ...weekdays } = restaurant.openingHours;
console.log(weekdays); //fri and thu

//REST in functions
const add = function (...numbers) {
  console.log(numbers);
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  console.log(sum);
};
add(2, 3);
add(5, 3, 7, 2);

const x = [25, 5, 7];
add(...x); //spread operator

restaurant.orderPizza('mushrooms', 'onion', 'olives', 'spinach');
restaurant.orderPizza('mushrooms');
 */
/*
const arr = [2, 3, 4];
const a = arr[0];
const b = arr[1];
const c = arr[2];

const [x, y, z] = arr;
console.log(x, y, z);

//const [first, second] = restaurant.categories;
//const [first, , second] = restaurant.categories;
//console.log(first, second);
let [main, , secondary] = restaurant.categories;
console.log(main, secondary);
//Switching variable
//const temp = main;
//main = secondary;
//secondary = main;
//or
[main, secondary] = [secondary, main];
console.log(main, secondary);

//received 2 return values
const [starter, mainCourse] = restaurant.order(2, 0);
console.log(starter, mainCourse);

//Nested destructuring
const nested = [2, 3, [5, 6]];
const [d, , f] = nested;
console.log(d, f);
const [i, , [j, k]] = nested;
console.log(i, j, k);

//Default values
//const [p, q, r] = [8, 9];
const [p = 1, q = 1, r = 1] = [8, 9];
console.log(p, q, r);
 */

const books = [
  {
    title: 'Algorithms',
    author: ['Robert Sedgewick', 'Kevin Wayne'],
    publisher: 'Addison-Wesley Professional',
    publicationDate: '2011-03-24',
    edition: 4,
    keywords: [
      'computer science',
      'programming',
      'algorithms',
      'data structures',
      'java',
      'math',
      'software',
      'engineering',
    ],
    pages: 976,
    format: 'hardcover',
    ISBN: '9780321573513',
    language: 'English',
    programmingLanguage: 'Java',
    onlineContent: true,
    thirdParty: {
      goodreads: {
        rating: 4.41,
        ratingsCount: 1733,
        reviewsCount: 63,
        fiveStarRatingCount: 976,
        oneStarRatingCount: 13,
      },
    },
    highlighted: true,
  },
  {
    title: 'Structure and Interpretation of Computer Programs',
    author: [
      'Harold Abelson',
      'Gerald Jay Sussman',
      'Julie Sussman (Contributor)',
    ],
    publisher: 'The MIT Press',
    publicationDate: '2022-04-12',
    edition: 2,
    keywords: [
      'computer science',
      'programming',
      'javascript',
      'software',
      'engineering',
    ],
    pages: 640,
    format: 'paperback',
    ISBN: '9780262543231',
    language: 'English',
    programmingLanguage: 'JavaScript',
    onlineContent: false,
    thirdParty: {
      goodreads: {
        rating: 4.36,
        ratingsCount: 14,
        reviewsCount: 3,
        fiveStarRatingCount: 8,
        oneStarRatingCount: 0,
      },
    },
    highlighted: true,
  },
  {
    title: "Computer Systems: A Programmer's Perspective",
    author: ['Randal E. Bryant', "David Richard O'Hallaron"],
    publisher: 'Prentice Hall',
    publicationDate: '2002-01-01',
    edition: 1,
    keywords: [
      'computer science',
      'computer systems',
      'programming',
      'software',
      'C',
      'engineering',
    ],
    pages: 978,
    format: 'hardcover',
    ISBN: '9780130340740',
    language: 'English',
    programmingLanguage: 'C',
    onlineContent: false,
    thirdParty: {
      goodreads: {
        rating: 4.44,
        ratingsCount: 1010,
        reviewsCount: 57,
        fiveStarRatingCount: 638,
        oneStarRatingCount: 16,
      },
    },
    highlighted: true,
  },
  {
    title: 'Operating System Concepts',
    author: ['Abraham Silberschatz', 'Peter B. Galvin', 'Greg Gagne'],
    publisher: 'John Wiley & Sons',
    publicationDate: '2004-12-14',
    edition: 10,
    keywords: [
      'computer science',
      'operating systems',
      'programming',
      'software',
      'C',
      'Java',
      'engineering',
    ],
    pages: 921,
    format: 'hardcover',
    ISBN: '9780471694663',
    language: 'English',
    programmingLanguage: 'C, Java',
    onlineContent: false,
    thirdParty: {
      goodreads: {
        rating: 3.9,
        ratingsCount: 2131,
        reviewsCount: 114,
        fiveStarRatingCount: 728,
        oneStarRatingCount: 65,
      },
    },
  },
  {
    title: 'Engineering Mathematics',
    author: ['K.A. Stroud', 'Dexter J. Booth'],
    publisher: 'Palgrave',
    publicationDate: '2007-01-01',
    edition: 14,
    keywords: ['mathematics', 'engineering'],
    pages: 1288,
    format: 'paperback',
    ISBN: '9781403942463',
    language: 'English',
    programmingLanguage: null,
    onlineContent: true,
    thirdParty: {
      goodreads: {
        rating: 4.35,
        ratingsCount: 370,
        reviewsCount: 18,
        fiveStarRatingCount: 211,
        oneStarRatingCount: 6,
      },
    },
    highlighted: true,
  },
  {
    title: 'The Personal MBA: Master the Art of Business',
    author: 'Josh Kaufman',
    publisher: 'Portfolio',
    publicationDate: '2010-12-30',
    keywords: ['business'],
    pages: 416,
    format: 'hardcover',
    ISBN: '9781591843528',
    language: 'English',
    thirdParty: {
      goodreads: {
        rating: 4.11,
        ratingsCount: 40119,
        reviewsCount: 1351,
        fiveStarRatingCount: 18033,
        oneStarRatingCount: 1090,
      },
    },
  },
  {
    title: 'Crafting Interpreters',
    author: 'Robert Nystrom',
    publisher: 'Genever Benning',
    publicationDate: '2021-07-28',
    keywords: [
      'computer science',
      'compilers',
      'engineering',
      'interpreters',
      'software',
      'engineering',
    ],
    pages: 865,
    format: 'paperback',
    ISBN: '9780990582939',
    language: 'English',
    thirdParty: {
      goodreads: {
        rating: 4.7,
        ratingsCount: 253,
        reviewsCount: 23,
        fiveStarRatingCount: 193,
        oneStarRatingCount: 0,
      },
    },
  },
  {
    title: 'Deep Work: Rules for Focused Success in a Distracted World',
    author: 'Cal Newport',
    publisher: 'Grand Central Publishing',
    publicationDate: '2016-01-05',
    edition: 1,
    keywords: ['work', 'focus', 'personal development', 'business'],
    pages: 296,
    format: 'hardcover',
    ISBN: '9781455586691',
    language: 'English',
    thirdParty: {
      goodreads: {
        rating: 4.19,
        ratingsCount: 144584,
        reviewsCount: 11598,
        fiveStarRatingCount: 63405,
        oneStarRatingCount: 1808,
      },
    },
    highlighted: true,
  },
];

/* //1.1
[firstbook, secondbook] = books;
//1.2
[, , thirdbook] = books;
//1.3
const ratings = [
  ['rating', 4.19],
  ['ratingsCount', 144584],
];
[[, rating], [, ratingCount]] = ratings;
console.log(rating, ratingCount);
//1.4
const ratingStars = [63405, 1808];
const [fiveStarRating, oneStarRatings, threeStarRatings = 0] = ratingStars;
console.log(fiveStarRating, oneStarRatings, threeStarRatings);
 */

//Use any data type, return any data type and
//short-circuiting
/* console.log('---OR---');

console.log(3 || 'Jonas'); //3 is true so 'Jonas' is not evaluated
console.log('' || 'Jonas');
console.log(true || 0);
//Both falsy. Return null even if nulll is falsy
console.log(undefined || null);
//return 'Hello' qich is the first truthy value
console.log(undefined || 0 || '' || 'Hello' || 23 || null);

restaurant.numGuests = 23;
//if restaurant.numGuests = 0, guest1 & 2 will be 10, not 0
const guest1 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guest1);

const guest2 = restaurant.numGuests || 10;
console.log(guest2);

console.log('---AND---');
console.log(0 && 'Jonas'); //falsy 0, Jonas not evaluated
console.log(7 && 'jonas');

console.log('Hello' && 23 && null && 'Jonas'); //return null

if (restaurant.orderPizza) {
  //restaurant.orderPizza is defined, so true
  restaurant.orderPizza('mushrooms', 'spinach');
}

//Same because if restaurant.orderPizza is undefined, the secon part is not called
restaurant.orderPizza && restaurant.orderPizza('mushrooms', 'spinach');
 */
/* 
//Nullish value are null and undefined
//let guest = 0;
const guest = restaurant.numGuests ?? 10;
console.log(guest);

const rest1 = { name: 'Capri', numGuests: 20 };
const rest2 = { name: 'La Piazza', owner: 'Giovanni Rossi' };

// rest1.numGuests = rest1.numGuests || 10;
// rest2.numGuests = rest2.numGuests || 10;

rest1.numGuests = 0;
// rest1.numGuests ||= 10;
// rest2.numGuests ||= 10;
rest1.numGuests ??= 10;
rest2.numGuests ??= 10;
console.log(rest1, rest2);

rest1.owner &&= '<Anonymous>';
rest2.owner &&= '<Anonymous>';
console.log(rest1, rest2);
 */

///////////////////////////////////////
// Coding Challenge #1

/* 
We're building a football betting app (soccer for my American friends 😅)!

Suppose we get data from a web service about a certain game (below). In this challenge we're gonna work with the data. So here are your tasks:

1. Create one player array for each team (variables 'players1' and 'players2')
2. The first player in any player array is the goalkeeper and the others are field players. For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10 field players
3. Create an array 'allPlayers' containing all players of both teams (22 players)
4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a new array ('players1Final') containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'
5. Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')
6. Write a function ('printGoals') that receives an arbitrary number of player names (NOT an array) and prints each of them to the console, along with the number of goals that were scored in total (number of player names passed in)
7. The team with the lower odd is more likely to win. Print to the console which team is more likely to win, WITHOUT using an if/else statement or the ternary operator.

TEST DATA FOR 6: Use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'. Then, call the function again with players from game.scored

GOOD LUCK 😀
*/
/* 
const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

//1
const players1 = game.players[0];
const players2 = game.players[1];
console.log(players1, players2);

//2
const gk = game.players[0][0];
const [, ...fieldPlayers] = game.players[0];
console.log(gk, fieldPlayers);

//3
const allPlayers = [...game.players[0], ...game.players[1]];
console.log(allPlayers);

//4
const players1Final = [...game.players[0], 'Thiago', 'Coutinho', 'Perisic'];
console.log(players1Final);

//5
const {
  odds: { team1, x: draw, team2 },
} = game;
console.log(team1, draw, team2);

//6
const printGoals = function (...players) {
  for (let i = 0; i < players.length; i++) {
    console.log(players[i]);
  }
  //console.log(players);
  console.log(players.length + 1);
};

printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich');
printGoals(...game.scored);

//7
team1 < team2 && console.log('Team 1 is more likely to win');
team1 > team2 && console.log('Team 2 is more likely to win');
 */
/* 
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
//We can use continue or break statements
//for (const item of menu) console.log(item);

//console.log([...menu.entries()]);
// for (const item of menu.entries()) {
//   console.log(`${item[0] + 1}: ${item[1]}`);
// }
for (const [i, el] of menu.entries()) {
  console.log(`${i + 1}: ${el}`);
}
 */
