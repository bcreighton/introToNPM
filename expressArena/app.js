const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('Pizza');
});

app.get('/burgers', (req, res) => {
  res.send('We have juicy cheese burgers!');
})

app.get('/pizza/pepperoni', (req, res) => {
  res.send('Your pizza is on its way!!');
})

app.get('/pizza/pineapple', (req, res) => {
  res.send('We don\'t serve that here! Never call again');
})

app.get('/echo', (req, res) => {
  const requestText = `Here are some details of your request:
    Base URL: ${req.baseUrl}
    Host: ${req.hostname}
    Path: ${req.path}
    `;

  res.send(requestText);
})

app.get('/queryViewer', (req, res) => {
  console.log(req.query);
  res.end();
})

app.listen(8000, () => {
  console.log('Express server is listening on port 8000!');
})