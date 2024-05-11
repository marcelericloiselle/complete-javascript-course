//Exporting module
console.log('Exporting module');

//Blocking code
// console.log('Start fetchin user');
// await fetch('https://jsonplaceholder.typicode.com/users');
// console.log('Finished fetchin user');

//Module scope
const shippingCost = 10;
export const cart = [];

//Export need to be top level
export const addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
};

const totalPrice = 237;
const totalQuantity = 23;
export { totalPrice, totalQuantity as tq };

export default function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
}
