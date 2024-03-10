/*
let javascriptIsFun = true;
console.log(javascriptIsFun, typeof javascriptIsFun);
javascriptIsFun = "great;"
console.log(javascriptIsFun, typeof javascriptIsFun);

let year;
console.log(year, typeof year);

console.log(null, typeof null);
*/

/*
//no let, created globally!
lastName = 'Loiselle'
console.log(lastName);
lastName = 'Tremblay';
console.log(lastName);
*/

////2 to th power of 3
//console.log(2 ** 3);

// //Marks weights 78 kg and is 1.69 m tall. John weights 92 kg and is 1.95
// let markHeigt = 1.69;
// let markWeight = 78;
// let johnHeigth = 1.95;
// let johnWeight = 92;

// //mass in kg and height in meter
// //let BMI = mass / height ** 2;
// //or let BMI = mass / (height * height);
// let markHigherBMI = markWeight / markHeigt ** 2 > johnWeight / johnHeigth ** 2;
// let markBMI = markWeight / markHeigt ** 2;
// let johnBMI = johnWeight / johnHeigth ** 2;
// console.log(`Mark BMI is over the john BMI ${markHigherBMI}`);
// console.log(markBMI, johnBMI);
// console.log(markBMI > johnBMI);

//: Marks weights 95 kg and is 1.88 m tall. John weights 85 kg and is 1.76
// const markHeigt = 1.88;
// const markWeight = 95;
// const johnHeigth = 1.76;
// const johnWeight = 85;

// //mass in kg and height in meter
// //let BMI = mass / height ** 2;
// //or let BMI = mass / (height * height);
// markHigherBMI = markWeight / markHeigt ** 2 > johnWeight / johnHeigth ** 2;
// console.log(`Mark BMI is over the john BMI ${markHigherBMI}`);

// let a = 'abc\' def'

// console.log("string with \n\
// multiple line");
// console.log(`multiples
// line`)

// type convertion
/*const inputYear = '1991';
console.log(inputYear + 10);

console.log(Number(inputYear) + 10);

console.log(Number('Eric'));
console.log(typeof NaN);

if (Number('Eric') === NaN)
    //won't show
    console.log("Number('Eric') is not a number");

console.log(String(21), 21);

//type coercion
console.log("I'm " + 23); //+ coerce to string
console.log('21' - '10' - 5); //- coerce to number
console.log('25' / '2'); //divide coerce to number

let n = '1' + 1; //coerce to string => '11'
n = n - 1; //coerce to number => 10
console.log(n); //10
console.log('10' - '4' - '3' - 2 + '5'); //=> "15"
*/

// //Flasy values: 0, '', undefined, null, NaN
// console.log('Falsy values')
// console.log(Boolean(0));
// console.log(Boolean(''));
// console.log(Boolean(undefined));
// console.log(Boolean(null));
// console.log(Boolean(NaN));
// console.log('Truthy values')
// console.log(Boolean({}));
// console.log(Boolean(1));
// console.log(Boolean('b'));

// const money = 0;
// if (money)
//     console.log('money is true')
// else {
//     console.log('money is false')
// }

// let heigth;
// //heigth = 0;
// if (heigth) {
//     console.log(heigth)
// }
// else {
//     console.log('undefined')
// }
// if (heigth = undefined) {
//     console.log('undefined')
// }
// else {
//     console.log('defined')
// }

// let age = 18;

// if (age === 18)
//     console.log('You just become an adult');

// //sctrict comparison (no coercion)
// if (age === '18')
//     console.log('age === 18');
// //Loose comparison (coercion)
// if (age == '18')
//     console.log('age == 18');

// let n = prompt('Enter a number.')
// console.log(n, typeof n);
// if (n !== '23')
//     console.log('not \'23\'');
// if (n !== 23)
//     console.log('not 23 ');

// //Expression the produce a valu:
// 3 + 4;
// 'ABC'
// true && false

// //Statements
// //  does't produca a value
// //  perform some action

// //if and switch are a statements
// if (23 > 10)
//     console.log('23 is bigger'); //this line is statement, the '23...' is a expression

// let age = 17;
// age >= 18 ? console.log('adult') : console.log('not an adult');
// const drink = age >= 18 ? 'wine' : 'water';
// console.log(drink);

// console.log(`I like to drink ${age >= 18 ? "wine" : "water"}`);

// const bill = 275;
// const tip = bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;
// console.log(`The bill was ${bill}, the tip was ${tip}, and the total value {bill + tip}`);

