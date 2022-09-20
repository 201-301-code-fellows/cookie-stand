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
// Used MDN for template
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/* This array is where all data is pulled from for all functions, if a objects(locations) are added or removed, edit this array */
const locations = [];

/* Constructor for cties */
function City(cityName, minCust, maxCust, avgSales) {
  this.cityName = cityName;
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.avgSales = avgSales;
  this.results = [];
  this.totalSales = 0;
  locations.push(this);
}

City.prototype.custPerHour = function () {
  return getRandomInt(this.minCust, this.maxCust);
};

new City('Seattle', 23, 65, 6.3);
new City('Tokyo', 3, 24, 1.2);
new City('Dubai', 11, 38, 3.7);
new City('Paris', 20, 38, 2.3);
new City('Lima', 2, 16, 4.6);

/* Generate objects for each location */
buildResults(locations);

/* Build data for each location based on min/max values in objects */
function buildResults(location) {
  for (let city of location) {
    for (let i = 0; i < hoursOpen; i++) {
      city.results.push(city.custPerHour() * Math.floor(city.avgSales));
      city.totalSales += city.results[i];
    }
  }
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

/* Generate HTML for each city */
function generateHTML() {
  for (let city of locations) {
    createSections(city);
    createH3(city);
  }
}
generateHTML();