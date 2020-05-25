const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));

app.get('/', (req, res) => {
  debugger
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

app.get('/greetings', (req, res) => {
  // get value from the request
  const name = req.query.name;
  const race = req.query.race;

  // validate the values
  if (!name) {
    // name was note provided
    return res.status(400).send('Name is required');
  }

  if (!race) {
    // race was not provided
    return res.status(400).send('Please provide a race');
  }

  // both name and race are valid so execute the process
  const greeting = `Greetings ${name} the ${race}, welcome to our kingdom.`;

  // send the response
  res.send(greeting);
})

app.get('/sum', (req, res) => {
  //get values from request
  const a = parseInt(req.query.a, 10);
  const b = parseInt(req.query.b, 10);

  // add values
  const sum = a + b;

  // return sum
  res.send(`The sum of ${a} and ${b} is ${sum}`);
})

app.get('/cipher', (req, res) => {
  const text = req.query.text;
  const shift = parseInt(req.query.shift, 10);
  let encryptedStr = '';

  // shift each character in the string by the specified shift
  for (let i = 0; i < text.length; i++) {
    let encryptedCharCode = text.charCodeAt(i) + shift;

    if (text.charCodeAt(i) < 91) {
      if (encryptedCharCode > 90) {
        encryptedStr += String.fromCharCode((65 - 1) + (encryptedCharCode - 90))
      } else {
        encryptedStr += String.fromCharCode(encryptedCharCode)
      }
    } else if (encryptedCharCode > 122) {
      encryptedStr += String.fromCharCode((97 - 1) + (encryptedCharCode - 122))
    } else {
      encryptedStr += String.fromCharCode(encryptedCharCode)
    }
  }

  // return encrypted string
  res.send(encryptedStr);
})

app.get('/lotto', (req, res) => {
  const numbers = req.query.arr;
  const lottoNumbers = [];
  const min = Math.ceil(1);
  const max = Math.floor(20);
  let correctMatches = 0;
  let convertedNumbers = [];
  let message = '';

  generateNumber = () => Math.floor(Math.random() * (max - min + 1)) + min;

  isCorrect = () => correctMatches++;

  // generate unique random lotto numbers
  for (let i = 0; i < 6; i++) {
    let ranNum = generateNumber();

    if (lottoNumbers.includes(ranNum)) {
      ranNum = generateNumber();
    } else {
      lottoNumbers.push(ranNum)
    }
  }

  // convert sumbitted numbers from strings to ints
  numbers.forEach(num => {
    let int = parseInt(num, 10);
    convertedNumbers.push(int)
    return convertedNumbers;
  })

  // check for matching numbers
  for (i = 0; i < convertedNumbers.length; i++) {
    lottoNumbers.includes(convertedNumbers[i]) && isCorrect();
  }

  correctMatches < 4 && (message = `Sorry, you lose`);
  correctMatches === 4 && (message = `Congratulations! You win a free ticket`);
  correctMatches === 5 && (message = `Congratulations! You win $100!`);
  correctMatches === 6 && (message = `Wow! Unbelievable! You could have won the mega millions!`);


  res.send(message);
})

app.listen(8000, () => {
  console.log('Express server is listening on port 8000!');
})