'use strict';

const HOUR_BLOCKS = ['6am','7am','8am','9am','10am','11am','12pm','1pm','2pm','3pm','4pm','5pm','6pm','7pm'];

let storeContainer = document.getElementById('salesDiv');

function SalmonStore (name, min, max, avg) {
  this.name = name;
  this.min = min;
  this.max = max;
  this.avg = avg;
  this.id = `${this.name}StoreId`;
  this.cookiesThisHourArray = [];
  this.getRandomNumberOfCustomers = function() {
    return Math.floor(Math.random() * (this.max - this.min + 1) + this.min);
  };
  this.calculateCookiesThisHour = function() {
    for (let i = 0; i < HOUR_BLOCKS.length; i++) {
      let cookiesThisHour = Math.round(this.avg * this.getRandomNumberOfCustomers());
      this.cookiesThisHourArray.push(cookiesThisHour);
    }
  };
  this.renderList = function() {
    let storeArticle = document.getElementById(this.id);
    this.calculateCookiesThisHour();
    let ul = document.createElement('ul');
    let cookieTotal = 0;
    for (let i = 0; i < HOUR_BLOCKS.length; i++) {
      let li = document.createElement('li');
      li.textContent = `${HOUR_BLOCKS[i]}: ${this.cookiesThisHourArray[i]} cookies`;
      ul.appendChild(li);
      cookieTotal += this.cookiesThisHourArray[i];
    }
    let li = document.createElement('li');
    li.textContent = `Total: ${cookieTotal} cookies`;
    ul.appendChild(li);
    storeArticle.appendChild(ul);
  }
  this.renderStore = function() {
    let storeArticle = document.createElement('article');
    storeArticle.setAttribute('id', this.id);
    storeContainer.appendChild(storeArticle);
    let h3 = document.createElement('h3');
    h3.textContent = `${this.name}`;
    storeArticle.appendChild(h3);
    this.renderList();
  }
}

// empty array to contain instantiated SalmonStore objects
const storeArray = [];

// create SalmonStore object from constructor prototype
let seattle = new SalmonStore (
  'Seattle',
  23,
  65,
  6.3
);
// then add it to storeArray to use later
storeArray.push(seattle);

let tokyo = new SalmonStore (
  'Tokyo',
  3,
  24,
  1.2
);
storeArray.push(tokyo);

let dubai = new SalmonStore (
  'Dubai',
  11,
  38,
  3.7
);
storeArray.push(dubai);

let paris = new SalmonStore (
  'Paris',
  20,
  38,
  2.3
);
storeArray.push(paris);

let lima = new SalmonStore (
  'Lima',
  2,
  16,
  4.6
);
storeArray.push(lima);

// function to render all stores at once with a single call using for loop
// scaleable for any number of stores
function renderAllStores() {
  for (let i = 0; i < storeArray.length; i++) {
  storeArray[i].renderStore();
  }
}

renderAllStores();
