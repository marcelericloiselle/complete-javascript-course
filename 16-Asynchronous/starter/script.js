'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

//It's not a big deal, it's really just one small change. Instead of:
//https://restcountries.eu/rest/v2/
//It's now:
//https://countries-api-836d.onrender.com/countries/

///////////////////////////////////////

// const getCountryData = function (country) {
//   const request = new XMLHttpRequest();
//   request.open(
//     'GET',
//     `https://countries-api-836d.onrender.com/countries/name/${country}`
//   );
//   request.send();

//   request.addEventListener('load', function () {
//     //console.log(this.responseText); //this is the request object

//     //[data] because we received an array of 1 element
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);

//     const html = `
//     <article class="country">
//     <img class="country__img" src="${data.flag}" />
//     <div class="country__data">
//         <h3 class="country__name">${data.name}</h3>
//         <h4 class="country__region">${data.region}</h4>
//         <p class="country__row"><span>👫</span>${(
//           +data.population / 1000000
//         ).toFixed(1)} people</p>
//         <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
//         <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
//     </div>
//     </article>
//     `;
//     countriesContainer.insertAdjacentHTML('beforeend', html);
//     countriesContainer.style.opacity = 1;
//   });
// };

// getCountryData('portugal');
// getCountryData('usa');
// getCountryData('canada');

// //--- Welcome to call back hell
const renderCountry = function (data, classname = '') {
  const html = `
      <article class="country ${classname}">
      <img class="country__img" src="${data.flag}" />
      <div class="country__data">
          <h3 class="country__name">${data.name}</h3>
          <h4 class="country__region">${data.region}</h4>
          <p class="country__row"><span>👫</span>${(
            +data.population / 1000000
          ).toFixed(1)} people</p>
          <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
          <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
      </div>
      </article>
      `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

// const getCountryAndNeighbour = function (country) {
//   //AJAX call country 1
//   const request = new XMLHttpRequest();
//   request.open(
//     'GET',
//     `https://countries-api-836d.onrender.com/countries/name/${country}`
//   );
//   request.send();

//   request.addEventListener('load', function () {
//     //console.log(this.responseText); //this is the request object

//     //[data] because we received an array of 1 element
//     const [data] = JSON.parse(this.responseText);
//     //console.log(data);

//     //Render country 1
//     renderCountry(data);

//     //Get neighbour
//     const neighbour = data.borders?.[0]; //?.[0]; might be no neighbour

//     if (!neighbour) return;

//     //AJAX Call country 2
//     const request2 = new XMLHttpRequest();
//     request2.open(
//       'GET',
//       `https://countries-api-836d.onrender.com/countries/alpha/${neighbour}`
//     );
//     request2.send();

//     request2.addEventListener('load', function () {
//       const data2 = JSON.parse(this.responseText);
//       //console.log(data2);

//       //Render country 2
//       renderCountry(data2, 'neighbour');
//     });
//   });
// };

// //getCountryAndNeighbour('portugal');
// getCountryAndNeighbour('usa');
// //getCountryAndNeighbour('canada');

// //Callback hell
// setTimeout(() => {
//   console.log('1 second pass');
//   setTimeout(() => {
//     console.log('2 second pass');
//     setTimeout(() => {
//       console.log('3 second pass');
//       setTimeout(() => {
//         console.log('4 second pass');
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);

//--- Promises and the fetch API (ES6)
// const request = fetch(
//   `https://countries-api-836d.onrender.com/countries/name/portugal`
// );
// console.log(request);
// setTimeout(() => console.log(request), 1000);

//--- Consumming promise
// const getCountryData = function (country) {
//   fetch(`https://countries-api-836d.onrender.com/countries/name/${country}`)
//     .then(function (response) {
//       console.log(response);
//       return response.json(); //json funtion is also async
//     })
//     .then(function (data) {
//       console.log(data);
//       renderCountry(data[0]);
//     });
// };

// const getCountryData = function (country) {
//   fetch(`https://countries-api-836d.onrender.com/countries/name/${country}`)
//     .then(response => response.json())
//     .then(data => renderCountry(data[0]));
// };

//getCountryData('portugal');

//---Chaining promises
//--- Handled the rejected promise
//--- Throwing error manually

/*
const getCountryData = function (country) {
  //Country 1
  fetch(`https://countries-api-836d.onrender.com/countries/name/${country}`)
    .then(
      response => {
        //console.log(response);
        if (!response.ok) {
          //Reject thte promise, so we go to catch
          throw new Error(`Country not found (${response.status})`);
        }
        return response.json();
      }
      //, err => alert(err)
    )
    //Data is the value restur by the 1st then
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];
      //const neighbour = 'flkhkl';
      if (!neighbour) return;
      //Country 2
      return fetch(
        `https://countries-api-836d.onrender.com/countries/alpha/${neighbour}`
      );
    })
    .then(response => {
      if (!response.ok) {
        //Reject thte promise, so we go to catch
        throw new Error(`Country not found (${response.status})`);
      }
      response.json();
    })
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      console.error(`${err} ⁉️ ⁉️ ⁉️`);
      renderError(`Something went wrong ⁉️ ⁉️ ${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};
*/

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) {
      //console.log(response);
      throw new Error(`${errorMsg} (${response.status})`);
    }
    return response.json();
  });
};

const getCountryData = function (country) {
  //Country 1
  getJSON(
    `https://countries-api-836d.onrender.com/countries/name/${country}`,
    'Country not found'
  )
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];
      //const neighbour = 'flkhkl';
      if (!neighbour) throw new Error('No neigbour found');
      //Country 2
      return getJSON(
        `https://countries-api-836d.onrender.com/countries/alpha/${neighbour}`,
        'Country not found'
      );
    })
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      console.error(`${err} ⁉️ ⁉️ ⁉️`);
      renderError(`Something went wrong ⁉️ ⁉️ ${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

/*
btn.addEventListener('click', function (e) {
  getCountryData('portugal');
});

//getCountryData('sklifsj');
//getCountryData('australia');
*/

///////////////////////////////////////
// Coding Challenge #1

/* 
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

Here are your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude 
  value (lat) and a longitude value (lng) (these are GPS 
    coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. 
  Reverse geocoding means to convert coordinates to a meaningful
  location, like a city and country name. Use this API to do 
  reverse geocoding: https://geocode.xyz/api.
  The AJAX call will be done to a URL with this format:
   https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch 
   API and promises to get the data. Do NOT use the getJSON 
   function we created, that is cheating 😉
3. Once you have the data, take a look at it in the console 
  to see all the attributes that you recieved about the
   provided location. Then, using this data, log a messsage 
   like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and 
  log errors to the console
5. This API allows you to make only 3 requests per second. 
  If you reload fast, you will get this error with code 403. 
  This is an error with the request. Remember, fetch() does 
  NOT reject the promise in this case. So create an error to 
  reject the promise yourself, with a meaningful error message.

PART 2
6. Now it's time to use the received data to render a country. 
  So take the relevant attribute from the geocoding API result, 
  and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have
  done in the last lecture (you can even copy this code, no 
  need to type the same code)

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474

GOOD LUCK 😀
*/
/*
const whereAmI = function (lat, lng) {
  fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
    .then(response => {
      console.log(response);
      return response.json();
    })
    .then(data => {
      //console.log(data);
      //if (!response.ok)
      if (data.distance === 'Throttled! See geocode.xyz/pricing') {
        throw new Error(`Error ${data.distance}`);
      }
      console.log(`You are in ${data.city}, ${data.country}`);
      getCountryData(data.country.toLowerCase());
    })
    .catch(err => console.log(err.message));
};

//whereAmI(52.508, 13.381);
//whereAmI(19.037, 72.873);
//whereAmI(-33.933, 18.474);
whereAmI(45.6057265, -72.9881365);
*/

//--- The event loop in practice
/* Console.log('Test start');
//Add Call back queue
setTimeout(() => console.log('0 sec timer'), 0);
//Add Microtask queue
Promise.resolve('Resolved promise 1').then(res => console.log(res));

Promise.resolve('Resoleved promise 2').then(res => {
  for (let i = 0; i < 1000000000; i++) {}
  console.log(res);
});
//Execute Microtask Promise 1
//Execute Microtask Promise 2 (long)
//Execute Callback Tiemout

console.log('Test end');
 */

//-- Building simple Promise
/* 
const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('Lottery draw is happening');
  setTimeout(function () {
    if (Math.random() >= 0.5) {
      resolve('You WIN😊');
    } else {
      reject(new Error('You loose your money 💩'));
    }
  }, 2000);
});

lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));
 */

//Promisifying setTimeout
// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// //Callback hell
// setTimeout(() => {
//   console.log('1 second pass');
//   setTimeout(() => {
//     console.log('2 second pass');
//     setTimeout(() => {
//       console.log('3 second pass');
//       setTimeout(() => {
//         console.log('4 second pass');
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);
/* 
wait(1)
  .then(() => {
    console.log('1 seconds passed');
    return wait(1);
  })
  .then(() => {
    console.log('2 seconds passed');
    return wait(1);
  })
  .then(() => {
    console.log('3 seconds passed');
    return wait(1);
  })
  .then(() => console.log('4 seconds passed'));
//

Promise.resolve('abc').then(x => console.log(x));
Promise.reject('abc').catch(x => console.error(x));
 */

//Promisifying Geolocation API

//Callback API
// navigator.geolocation.getCurrentPosition(
//   position => console.log(position),
//   err => console.error(err)
// );
// console.log('Getting position');

// //Promise API
/* 
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   err => reject(err)
    // );
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};
//getPosition().then(pos => console.log(pos));

const whereAmI = function () {
  getPosition()
    .then(pos => {
      const { latitude: lat, longitude: lng } = pos.coords;
      return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    })
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log(data);
      if (data.distance === 'Throttled! See geocode.xyz/pricing') {
        throw new Error(`Error ${data.distance}`);
      }
      console.log(`You are in ${data.city}, ${data.country}`);
      getCountryData(data.country.toLowerCase());
    })
    .catch(err => console.log(err.message));
};

btn.addEventListener('click', whereAmI);
 */

///////////////////////////////////////
// Coding Challenge #2

/* 
Build the image loading functionality that I just showed you on the screen.

Tasks are not super-descriptive this time, so that you can figure out some stuff on
 your own. Pretend you're working on your own 😉

PART 1
1. Create a function 'createImage' which receives imgPath as an input. This function 
  returns a promise which creates a new image (use document.createElement('img')) 
  and sets the .src attribute to the provided image path. When the image is done 
  loading, append it to the DOM element with the 'images' class, and resolve the 
  promise. The fulfilled value should be the image element itself. In case there
   is an error loading the image ('error' event), reject the promise.

If this part is too tricky for you, just watch the first part of the solution.

PART 2
2. Comsume the promise using .then and also add an error handler;
3. After the image has loaded, pause execution for 2 seconds using the wait function
   we created earlier;
4. After the 2 seconds have passed, hide the current image (set display to 'none'), 
  and load a second image (HINT: Use the image element returned by the createImage 
    promise to hide the current image. You will need a global variable for that 😉);
5. After the second image has loaded, pause execution for 2 seconds again;
6. After the 2 seconds have passed, hide the current image.

TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.

GOOD LUCK 😀
*/
/* 
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const imageContainer = document.querySelector('.images');

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const imageEl = document.createElement('img');
    //imageEl.setAttribute('src', imgPath);
    imageEl.src = imgPath;
    imageEl.addEventListener('load', function () {
      imageContainer.append(imageEl);
      resolve(imageEl);
    });
    imageEl.addEventListener('error', function () {
      reject(new Error('Image not found'));
    });
  });
};

let currentImage;

createImage('img/img-1.jpg')
  .then(img => {
    currentImage = img;
    console.log('Image loaded');
    return wait(2);
  })
  .then(() => {
    currentImage.style.display = 'none';
    return createImage('img/img-2.jpg');
  })
  .then(img => {
    currentImage = img;
    console.log('Image loaded 2');
    return wait(2);
  })
  .then(() => {
    currentImage.style.display = 'none';
    return createImage('img/img-3.jpg');
  })
  .then(img => {
    currentImage = img;
    console.log('Image loaded 3');
    return wait(2);
  })
  .then(() => {
    currentImage.style.display = 'none';
  })
  .catch(err => console.error(err));
 */
//--- Consuming promise with Async/Await and AJAX
// ES2017
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};
/* 
//Async function return a promise
//--- Try catch
//--- Returning value from async function
const whereAmI = async function () {
  try {
    //Geolocation
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;

    //reverse geocoding
    const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    //console.log(resGeo);
    //Always return OK, then test th e daata later
    //if (!resGeo.ok) throw new Error('Problem getting location data');

    const dataGeo = await resGeo.json();
    if (dataGeo.distance === 'Throttled! See geocode.xyz/pricing') {
      throw new Error('Problem getting location data');
    }
    //console.log(dataGeo);

    //Country data
    const res = await fetch(
      `https://countries-api-836d.onrender.com/countries/name/${dataGeo.country}`
    );
    if (!res.ok) throw new Error('Problem getting country');

    const data = await res.json();
    renderCountry(data[0]);

    return `You are in ${dataGeo.city}, ${dataGeo.country}`;
  } catch (err) {
    console.error(`${err} ⛔`);
    renderError(`${err.message}`);

    //Reject promise returned from async function
    throw err;
  }
};

console.log('1: Will get location');
//whereAmI();

// whereAmI()
//   .then(city => console.log(`2: ${city}`))
//   .catch(err => console.error(`2: ${err.message}`))
//   .finally(() => console.log('3: Finished getting location'));

(async function () {
  try {
    const city = await whereAmI();
    console.log(`2: ${city}`);
  } catch (err) {
    console.error(`2: ${err.message}`);
  }
  console.log('3: Finished getting location');
})();
 */

//--- Running Promises in parallel
/* const get3Country = async function (c1, c2, c3) {
  try {
    // const [data1] = await getJSON(
    //   `https://countries-api-836d.onrender.com/countries/name/${c1}`
    // );
    // const [data2] = await getJSON(
    //   `https://countries-api-836d.onrender.com/countries/name/${c2}`
    // );
    // const [data3] = await getJSON(
    //   `https://countries-api-836d.onrender.com/countries/name/${c3}`
    // );
    //console.log([data1.capital, data2.capital, data3.capital]);

    //if 1 promise reject the whole PromiseAll is rejected (short circuit)
    //Promise.All is a combinator
    const data = await Promise.all([
      getJSON(`https://countries-api-836d.onrender.com/countries/name/${c1}`),
      getJSON(`https://countries-api-836d.onrender.com/countries/name/${c2}`),
      getJSON(`https://countries-api-836d.onrender.com/countries/name/${c3}`),
    ]);
    console.log(data.map(d => d[0].capital));
  } catch {
    err => console.error(err);
  }
};
get3Country('portugal', 'canada', 'tanzania');
*/

//---Other Promise combinators

//Promise.race, settle a soos as 1 of the promise settlt (accepted or rejected)
// (async function () {
//   const res = await Promise.race([
//     getJSON(`https://countries-api-836d.onrender.com/countries/name/italy`),
//     getJSON(`https://countries-api-836d.onrender.com/countries/name/egypt`),
//     getJSON(`https://countries-api-836d.onrender.com/countries/name/mexico`),
//   ]);

//   console.log(res[0]);
// })();

/* const timeout = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error('request took to long'));
    }, sec * 1000);
  });
};

Promise.race([
  getJSON(`https://countries-api-836d.onrender.com/countries/name/tanzania`),
  timeout(1),
])
  .then(res => console.log(res[0]))
  .catch(err => console.error(err));
*/

//Promise.allSettled, ES2020
// Promise.allSettled([
//   Promise.resolve('Success'),
//   Promise.reject('Error'),
//   Promise.resolve('Another success'),
// ]).then(res => console.log(res));

// Promise.all([
//   Promise.resolve('Success'),
//   Promise.reject('Error'),
//   Promise.resolve('Another success'),
// ])
//   .then(res => console.log(res))
//   .catch(err => console.error(err));

// Promise.any, ES2121, return the 1st fulfilled promise, rjected are ignore
// Promise.any([
//   Promise.resolve('Success'),
//   Promise.reject('Error'),
//   Promise.resolve('Another success'),
// ])
//   .then(res => console.log(res))
//   .catch(err => console.error(err));

///////////////////////////////////////
// Coding Challenge #3

/* 
PART 1
Write an async function 'loadNPause' that recreates Coding 
  Challenge #2, this time using async/await (only the part where 
  the promise is consumed). Compare the two versions, think 
  about the big differences, and see which one you like more.
Don't forget to test the error handler, and to set the network 
speed to 'Fast 3G' in the dev tools Network tab.

PART 2
1. Create an async function 'loadAll' that receives an array
  of image paths 'imgArr';
2. Use .map to loop over the array, to load all the images 
  with the 'createImage' function (call the resulting array 'imgs')
3. Check out the 'imgs' array in the console! Is it like you 
  expected?
4. Use a promise combinator function to actually get the
 images from the array 😉
5. Add the 'paralell' class to all the images (it has some
   CSS styles).

TEST DATA: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg'].
 To test, turn off the 'loadNPause' function.

GOOD LUCK 😀
*/

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const imgContainer = document.querySelector('.images');

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', function () {
      imgContainer.append(img);
      resolve(img);
    });

    img.addEventListener('error', function () {
      reject(new Error('Image not found'));
    });
  });
};

const loadNPause = async function () {
  try {
    let img = await createImage('img/img-1.jpg');
    console.log('Image 1 loaded');
    await wait(2);
    img.style.display = 'none';

    img = await createImage('img/img-2.jpg');
    console.log('Image 2 loaded');
    await wait(2);
    img.style.display = 'none';

    img = await createImage('img/img-3.jpg');
    console.log('Image 3 loaded');
    await wait(2);
    img.style.display = 'none';
  } catch (err) {
    console.error(err);
  }
};
//loadNPause();

const loadAll = async function (imgArr) {
  try {
    const imgs = imgArr.map(async img => await createImage(img));
    //console.log(imgs);

    const imgsEl = await Promise.all(imgs);
    console.log(imgsEl);

    imgsEl.forEach(img => img.classList.add('parallel'));
  } catch (err) {
    console.error(err);
  }
};

loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);
