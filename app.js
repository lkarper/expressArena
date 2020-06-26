const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.send('<h1>Hello express!</h1>');
});

app.get('/burgers', (req, res) => {
    res.send('<h2>We have juicy cheese burgers!</h2>');
});

app.get('/pizza/pepperoni', (req, res) => {
    res.send('<h2>Your pizza is on the way!<h2>');
});

app.get('/pizza/pineapple', (req, res) => {
    res.send('<h2>We don\'t serve that here! Never call again!<h2>');
});

app.get('/echo', (req, res) => {
    const responseText = `Here are some details of your request:
      Base URL: ${req.baseUrl}
      Host: ${req.hostname}
      Path: ${req.path}
    `;
    res.send(responseText);
});

app.get('/queryViewer', (req, res) => {
    console.log(req.query);
    res.end(); //do not send any data back to the client
});

app.get('/greetings', (req, res) => {
    const name = req.query.name;
    const race = req.query.race;
    // const { name, race } = req.query;

    if (!name) {
        return res.status(400).send('Please provide a name');
    }

    if (!race) {
        return res.status(400).send('Please provide a race');
    }
    
    const greeting = `Greetings, ${name} the ${race}, welcome to the kingdom!`;

    name === 'Shubs' ? res.send(`<h1>${greeting}</h1>`) : res.send(greeting);

});

app.get('/sum', (req, res) => {
    const a = parseFloat(req.query.a);
    const b = parseFloat(req.query.b);

    if (!a || !b) {
        return res.status(400).send('Both query params a and b must be set to numbers');
    }

    const c = a + b;

    res.send(`The sum of ${a} and ${b} is ${c}`);
});

app.get('/cipher', (req, res) => {
    const text = req.query.text;
    console.log(text);
    const shift = parseInt(req.query.shift) >= 26 ? parseInt(req.query.shift) % 26 : parseInt(req.query.shift);

    if (!shift) {
        return res.status(400).send('Please provide a number!');
    }

    if (!text) {
        return res.status(400).send('Please provide a message to encode');
    }

    const charCodeArray = [];

    for (let i = 0; i < text.length; i++) {
        charCodeArray.push(text.toUpperCase().charCodeAt(i));
    }

    const shiftedArray = charCodeArray.map(code => {
        if (code + shift > 90) {
            return code + shift - 26;
        } else {
            return code + shift;
        }
    });

    console.log(shiftedArray);

    const shiftedText = String.fromCharCode(...shiftedArray);

    res.send(shiftedText);
    
});

app.get('/lotto', (req, res) => {
    const numbers =  req.query.arr.map(num => parseInt(num));
    

    if (!numbers || (numbers.typeof !== 'array' && numbers.length !== 6)) {
        return res.status(400).send('Please enter six numbers');
    }

    for (num of numbers) {
        const numOcc = numbers.reduce((occurances, number) => {
            if (number === num) {
                return occurances += 1;
            }
            return occurances;
        }, 0);
        if (!num) {
            return res.status(400).send('Please, enter numbers only');
        } else if (num < 1 || num > 20) {
            return res.status(400).send('Numbers must between between 1 and 20');
        } else if ( numOcc > 1) {
            return res.status(400).send('Please enter six different numbers!');
        }
    }

    const lottoNums = [0, 0, 0, 0, 0, 0].map(num => num + Math.ceil(Math.random() * 20));

    let correct = 0;

    numbers.forEach(num => {
        if (lottoNums.includes(num)) {
            correct += 1;
        }
    });

    console.log(numbers, lottoNums, correct);

    if (correct < 4) {
        res.send('Sorry, you lose');
    } 
    if (correct === 4) {
        res.send('Congrats, you win a free ticket!')
    }
    if (correct === 5) {
        res.send('Congrats! You win $100!');
    }
    if (correct === 6) {
        res.send('Wow! Unbelievable! You could have won the mega millions!');
    }
});

app.get('/hello', (req, res) => {
    res
        .status(204)
        .end();
});

app.get('/video', (req, res) => {
    const video = {
      title: 'Cats falling over',
      description: '15 minutes of hilarious fun as cats fall over',
      length: '15.40',
    }
    res.json(video);
});

app.get('/colors', (req, res) => {
    const colors = [
      {
        name: "red",
        rgb: "FF0000"
      },
      {
        name: "green",
        rgb: "00FF00"
      },
      {
        name: "blue",
        rgb: "0000FF"
      },
    ];
    res.json(colors);
});

app.get('/grade', (req, res) => {
    const { mark } = req.query;

    if (!mark) {
        return res
            .status(400)
            .send('Please provide a mark');
    }

    const numericMark = parseFloat(mark);
    if (Number.isNaN(numericMark)) {
        return res
            .status(400)
            .send('Mark must be a numeric value');
    }

    if (numericMark < 0 || numericMark > 100) {
        return res
            .status(400)
            .send('Mark must be in range 0 to 100');
    }

    if (numericMark >= 90) {
        return res.send('A');
    }

    if (numericMark >= 80) {
        return res.send('B');
    }

    if (numericMark >= 70) {
        return res.send('C');
    }

    res.send('F');
});

app.listen(8000, () => {
    console.log("Express server is listening on port 8000!");
});