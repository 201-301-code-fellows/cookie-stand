'use strict';

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
  'Total/City:',
];
let totalSales = 0; // totalSales will track the sales for all stores and all hours

/* Arguments to be used when invocating City constructor */
const cityArgs = [
  ['Seattle', 23, 65, 6.3],
  ['Tokyo', 3, 24, 1.2],
  ['Dubai', 11, 38, 3.7],
  ['Paris', 20, 38, 2.3],
  ['Lima', 2, 16, 4.6],
];

/* Select the table element from HTML to build the table on */
let table = document.querySelector('table');

/* Utility Functions */
const totalArray = []; // Used to store each hours data for totals later
totalTool(); // run the reset tool to set defaults
function totalTool() {
  const tfoot = document.querySelector('tfoot'); // remove old totals if added new data
  if (tfoot) {
    totalArray.shift(); // remove total string from array (gets generated by render)
    totalArray.pop(); // remove the other total (generated by render)
    tfoot.remove(); // remove all the tds from previous data
  }
  // create an array and populate with 0s for a hours totaling placeholder
  while (totalArray.length < timeOpenArray.length - 2) {
    totalArray.push(0);
  }
  return totalArray;
}

function randInt(min, max) {
  // Used MDN for template
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/* This array is where all data is pulled from for all functions to */
const locations = [];

/* Constructor for cties */
function City(cityName, minCust, maxCust, avgSales) {
  this.cityName = cityName;
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.avgSales = avgSales;
  this.results = [this.cityName];
  this.totalSales = 0;
  locations.push(this);
}

/* Grab data from input fields, and store in a variable */
function grabData() {
  const textfield = document.querySelectorAll('input');
  const inputValues = [];
  for (let inputs of textfield) {
    inputValues.push(inputs.value);
  }

  /* Turn input fields into numbers (except for the name) */
  for (let i = 1; i < inputValues.length; i++) {
    inputValues[i] = Number(inputValues[i]);
  }
  return inputValues;
}
/* Reset input fields to be blank */
function resetData() {
  const textfield = document.querySelectorAll('input');

  for (let inputs of textfield) {
    inputs.value = '';
  }
}
/* Select the button and wait for a click to add new location */
const button = document.querySelector('button');
button.addEventListener('click', function (event) {
  event.preventDefault();
  new City(...grabData());
  resetData();
  locations[locations.length - 1].custPerHour();
  locations[locations.length - 1].render();
  footerBuilder();
});

City.prototype.custPerHour = function () {
  for (let i = 0; i < timeOpenArray.length - 2; i++) {
    const num = Math.floor(this.avgSales * randInt(this.minCust, this.maxCust));
    this.totalSales += num;
    this.results.push(num);
    totalArray[i] += num;
    totalSales += num;
  }
};

City.prototype.render = function () {
  const tableRow = document.createElement('tr');
  table.appendChild(tableRow);
  let tableData = document.createElement('td');
  // tableRow.class = this.cityName.toLowerCase();
  for (let data of this.results) {
    tableData = document.createElement('td');
    tableData.innerText = data;
    tableRow.appendChild(tableData);
  }
  tableData = document.createElement('td');
  tableData.innerText = this.totalSales;
  tableRow.appendChild(tableData);
};

/* Generate new City objects that contain the data in cityArgs array */
for (let data of cityArgs) {
  new City(...data);
}

function createHeading() {
  for (let time of timeOpenArray) {
    const tableHead = document.createElement('th');
    tableHead.innerText = `${time}`;
    table.appendChild(tableHead);
  }
}

function footerBuilder() {
  const totalArray = totalTool();

  let tfoot = document.createElement('tfoot');
  table.appendChild(tfoot);
  totalArray.unshift('Total:');
  totalArray.push(`Total: ${totalSales}`);

  for (let totals of totalArray) {
    const td = document.createElement('td');
    td.innerText = totals;
    tfoot.appendChild(td);
  }
}

function buildThePage() {
  createHeading();
  for (let city of locations) {
    city.custPerHour();
    city.render();
  }
  footerBuilder();
}
buildThePage();


