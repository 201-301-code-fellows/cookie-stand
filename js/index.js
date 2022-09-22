/* Start express server */
const express = require('express');
const app = express();
const listeningPort = 8181;

/* Store new cities to a file to print later */
const fs = require('fs');
let file = fs.readFileSync('cities.json');
let data = JSON.parse(file);
console.log(data);

app.get('/', () => {
  app.render('index.html');
});

const server = app.listen(listeningPort, function () {
  const host = server.address().address;
  const port = server.address().port;
  console.log(`Listening on port ${port} at address ${host}`);
});
