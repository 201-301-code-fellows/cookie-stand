'use strict';

const hoursOpen = 14; /* 6AM to 7PM totals to 14 hours */
const timeOpenArray = [
  '6am:',
  '7am:',
  '8am:',
  '9am:',
  '10am:',
  '11am:',
  '12pm:',
  '1pm:',
  '2pm:',
  '3pm:',
  '4pm:',
  '5pm:',
  '6pm:',
  '7pm:',
];

/* Utility Functions */

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/* Shop Locations */

const seattle = {
  cityName: 'Seattle',
  minCust: 23,
  maxCust: 65,
  avgSales: 6.3,
  results: [],
  totalSales: 0,
  custPerHour() {
    return getRandomInt(this.minCust, this.maxCust);
  },
};

const tokyo = {
  cityName: 'Tokyo',
  minCust: 3,
  maxCust: 24,
  avgSales: 1.2,
  results: [],
  totalSales: 0,
  custPerHour() {
    return getRandomInt(this.minCust, this.maxCust);
  },
};

const dubai = {
  cityName: 'Dubai',
  minCust: 11,
  maxCust: 38,
  avgSales: 3.7,
  results: [],
  totalSales: 0,
  custPerHour() {
    return getRandomInt(this.minCust, this.maxCust);
  },
};

const paris = {
  cityName: 'Paris',
  minCust: 20,
  maxCust: 38,
  avgSales: 2.3,
  results: [],
  totalSales: 0,
  custPerHour() {
    return getRandomInt(this.minCust, this.maxCust);
  },
};

const lima = {
  cityName: 'Lima',
  minCust: 2,
  maxCust: 16,
  avgSales: 4.6,
  results: [],
  totalSales: 0,
  custPerHour() {
    return getRandomInt(this.minCust, this.maxCust);
  },
};

/* This array is where all data is pulled from for all functions, if a objects(locations) are added or removed, edit this array */
const locations = [seattle, tokyo, dubai, paris, lima];
/* Generate objects for each location */
buildResults(locations);

/* Build data for each location based on min/max values in objects */
function buildResults(location) {
  for (let city of location) {
    for (let i = 0; i < hoursOpen; i++) {
      city.results.push(city.custPerHour());
      city.totalSales += city.results[i];
    }
  }
}

/* Create Tabs on HTML */

function openCity(event, cityName) {
  /* Get all elements with class="tabdata" and hide them */
  let tabdata = document.getElementsByClassName('tabdata');
  for (let i = 0; i < tabdata.length; i++) {
    tabdata[i].style.display = 'none';
  }

  /* Get all elements with class="tabButtons" and remove the class "active" */
  let tabButtons = document.getElementsByClassName('tabButtons');
  for (let i = 0; i < tabButtons.length; i++) {
    tabButtons[i].className = tabButtons[i].className.replace(' active', '');
  }

  /* Show the current tab, and add an "active" class to the button that opened the tab */
  document.querySelector('.' + cityName).style.display = 'block';
  event.currentTarget.className += ' active';
}

/* Create Buttons in HTML for each tab */
function createButtons(location) {
  /* Grab nav element */
  let nav = document.querySelector('.tab');
  /* Create a button in a variable and assign it attributes */
  let button = document.createElement('button');
  button.innerHTML = location.cityName;
  button.setAttribute('class', 'tabButtons');
  button.setAttribute(
    'onclick',
    `openCity(event, "${location.cityName.toLowerCase()}")`
  ); // create the function call inside the HTML to make it dynamic

  /* Grab parent element and append the button */
  nav.appendChild(button);
}

/* Create Sections for each button in HTML */
function createSections(location) {
  /* Grab the main element to insert sections */
  let mainElement = document.querySelector('main');
  /* Create the sections elements in HTML */
  let section = document.createElement('section');
  section.setAttribute('class', `tabdata ${location.cityName.toLowerCase()}`);

  mainElement.appendChild(section);
}
/* Generate a heading element */

function createH3(location) {
  let h3 = document.createElement('h3');
  h3.innerText = `${location.cityName} Sales Data`;
  document.querySelector(`.${location.cityName.toLowerCase()}`).appendChild(h3);
}

/* Generate UL and LIs in each tab */
function createLists(location) {
  /* Grab the section element to insert ul */

  let section = document.querySelector('.' + location.cityName.toLowerCase());
  /* Create the ul elements in HTML */
  let ul = document.createElement('ul');
  section.appendChild(ul);
  for (let i = 0; i < hoursOpen; i++) {
    let li = document.createElement('li');
    li.innerText = `${timeOpenArray[i]} ${location.results[i]} cookies`;
    document
      .querySelector(`.${location.cityName.toLowerCase()}>ul`)
      .appendChild(li);
  }
  let li = document.createElement('li');
  li.innerText = `Total: ${location.totalSales}`;
  document
    .querySelector(`.${location.cityName.toLowerCase()}>ul`)
    .appendChild(li);
}

/* Generate HTML for each city */
function generateHTML() {
  for (let city of locations) {
    createButtons(city);
    createSections(city);
    createH3(city);
    createLists(city);
  }
}
generateHTML();
