/* Start express server */
const express = require('express');
const app = express();
const listeningPort = 8181;
const path = require('path');
app.use(express.static(path.join(__dirname + '/../', 'public')));

/* Store new cities to a file to print later */
const fs = require('fs');
let file = fs.readFileSync('cities.json');
let data = JSON.parse(file);
exports.theFile = () => {
  return data;
};

app.get('/', (req, res) => {
  res.sendFile('index.html');
});

app.get('/sales', (req, res) => {
  console.log('log');
  res.sendFile('sales.html');
});

app.post('/sales', (req, res) => {
  console.log(req);
});

const server = app.listen(listeningPort, function (err) {
  if (err) console.log(err);
  console.log(`Listening on port ${listeningPort}`);
});
