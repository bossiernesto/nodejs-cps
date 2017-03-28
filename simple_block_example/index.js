const port = 3030;
const express = require('express');
const app = express();
const fs = require('fs');

app.get('/', (req, res) => {
  req.timeStart = new Date();
  var timeStop = new Date();
  var response = ('Elapsed ' + (timeStop-req.timeStart) + 'ms');
  res.send('[response in '+response+']Hello, World');
});

app.get('/block', (req, res) => {
  req.timeStart = new Date();
  const end = Date.now() + 5000;
  while (Date.now() < end) {
    const doSomethingHeavyInJavaScript = 1 + 2 + 3;
  }
  var timeStop = new Date();
  var response = ('Elapsed ' + (timeStop-req.timeStart) + 'ms');
  res.send('[response in '+response+']Termino Finalmente!');
});

app.get('/file_block', (req, res) => {
  req.timeStart = new Date();

  var contents = fs.readFileSync('file.txt', 'utf8');
  console.log(contents);

  var timeStop = new Date();
  var response = ('Elapsed ' + (timeStop-req.timeStart) + 'ms');
  res.send('[response in '+response+']Termino Finalmente!');
});

app.get('/real_long_block', (req, res) => {
  req.timeStart = new Date();
  const end = Date.now() + 1000 * 100;
  while (Date.now() < end) {
    const doSomethingHeavyInJavaScript = 1 + 2 + 3;
  }
  var timeStop = new Date();
  var response = ('Elapsed ' + (timeStop-req.timeStart) + 'ms');
  res.send('[response in '+response+']Termino Finalmente!');
});

app.get('/non-block', (req, res) => {
  req.timeStart = new Date();
  // setTimeout is a native implementation and not from JS
  setTimeout(() => function() {
    var timeStop = new Date();
    var response = ('Elapsed ' + (timeStop-req.timeStart) + 'ms');
    res.send('[response in '+response+']Termine una llamada no bloqueante')}, 5000);
});

app.listen(port, () => console.log('Simple Blocking App listening on port 3000'));
