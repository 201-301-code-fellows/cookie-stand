'use strict';

const hoursOpen = 14; /* 6AM to 7PM totals to 14 hours */
const timeOpenArray = [
  'Time:',
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

const cityArgs = [
  ['Seattle', 23, 65, 6.3],
  ['Tokyo', 3, 24, 1.2],
  ['Dubai', 11, 38, 3.7],
  ['Paris', 20, 38, 2.3],
  ['Lima', 2, 16, 4.6],
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

City.prototype.render = function () {
  //TODO appendChild can go here
  //TODO building the TR and TDs can go here
};

/* Generate new City objects that contain the data in cityArgs array */
for (let data of cityArgs) {
  new City(...data);
}

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

const table = document.querySelector('table');

function createHeading() {
  for (let time of timeOpenArray) {
    const tableHead = document.createElement('th');
    tableHead.innerText = `${time}  `;
    table.appendChild(tableHead);
  }
}
createHeading();
