const express = require('express')
const firebase = require('./firebase.js');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

app.use(bodyParser.json());



app.get('/', (req, res) => res.send('Hello World!'))

app.post('/api/getAllUsers', firebase.getAllUsers)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))