//*Importing module

//import { addToCart, totalPrice as price, tq } from './shoppingCart.js';//extension optionnal
//addToCart('bread', 5);
//console.log(price, tq);

console.log('Importing module');
/* 
//console.log(shippingCost);

// import * as ShoppingCart from './shoppingCart.js';
// ShoppingCart.addToCart('bread', 5);
// console.log(ShoppingCart.totalPrice);

//Importing the default
//import add, { addToCart, totalPrice as price, tq } from './shoppingCart.js';
//console.log(price);
*/
import add, { cart } from './shoppingCart.js';
add('pizza', 2);
add('bread', 5);
add('apples', 4);

console.log(cart);

//Top level await, ES2022
//Await can be use outside of an async function in module
//Block the execution of the module
// console.log('start fetching');
// const res = await fetch('https://jsonplaceholder.typicode.com/posts');
// const data = await res.json();
// console.log(data);
// console.log('Something');
/*
const getLastPost = async function () {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await res.json();
  //console.log(data);

  return { title: data.at(-1).title, text: data.at(-1) };
};
const lastPost = getLastPost();

//Not very clean
//lastPost.then(last => console.log(last));
const lastPost2 = await getLastPost();
console.log(lastPost2);
 */
/* 
//The module pattern, pre ES6 module
//module in its own script have to be linked in the HTML
const ShoppingCart2 = (function () {
  const cart = [];
  const shoppingCost = 10;
  const totalPrice = 237;
  const totalQuantity = 23;

  const addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(
      `${quantity} ${product} added to cart (shipping cost is ${shoppingCost})`
    );
  };

  const orderStock = function (product, quantity) {
    console.log(`${quantity} ${product} order from supplier`);
  };

  return {
    addToCart,
    cart,
    totalPrice,
    totalQuantity,
  };
})();

ShoppingCart2.addToCart('apple', 4);
ShoppingCart2.addToCart('pizza', 2);
console.log(ShoppingCart2);
//console.log(ShoppingCart2.shoppingCost); => undefined
 */

/*
//CommonJS modules (use by NodeJS)
//1 file 1 module
//Work in nodeJS, doesn't work in browser
export.addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(
      `${quantity} ${product} added to cart (shipping cost is ${shoppingCost})`
    );
  };

  const orderStock = function (product, quantity) {
    console.log(`${quantity} ${product} order from supplier`);
  };

  //Import
  const { addToCart} = require('./shoppingCart');
  */

// ---- Introducing to NPM
//npm -v
//npm init
//npm install leaflet
// leaflet is CommonJS modules
//npm i lodash-es

//import cloneDeep from './node_modules/lodash-es/cloneDeep.js';
//With module loader:
import cloneDeep from 'lodash-es';

const state = {
  cart: [
    { product: 'bread', quantity: 5 },
    { product: 'pizza', quantity: 3 },
  ],
  user: { loggedIn: true },
};

const stateClone = Object.assign({}, state); //Point to the same object
const stateDeepClone = cloneDeep(state);
state.user.loggedIn = false;
console.log(stateClone);
console.log(stateDeepClone);

// Re-install or install on another compute
// Delete node_modules
// npm install

//-------
//Building with Parcel and npm script
//npm install parcel --save-dev
//npx parcel index.html
//Parcel will parse index.html (find script.js), the parse script.js and find alll the import
//May need to use sudo, or install specific version 1.12.4
//Parcel support CommonJS module

//Hot module relaoding while testing
//Keep all state between reload, so the cart array increase at each save
if (module.hot) {
  module.hot.accept();
}

//instead of npx parcel index.html
/* Add the folowing to package.json:
"scripts": {
    "start": "parcel index.html"
  },
*/
//then
//npm run start

//When dev is done build
/* Add the folowing to package.json:
  "scripts": {
    "build": "parcel build index.html"
  },
*/

//---- Configuring Babel and Polyfilling
//Babel = transpilling

//find and Promise are ES6 and not translate to ES5
//We need Polyfilling
console.log(cart.find(el => el.quantity >= 5));
Promise.resolve('test').then(x => console.log(x));

//Pollyfinling
//npm i core-js
import 'core-js/stable';
//import 'core-js/stable/array/find';
//import 'core-js/stable/promise';

//Pollyfinling async function
//npm i regenerator-runtime
import 'regenerator-runtime/runtime';
