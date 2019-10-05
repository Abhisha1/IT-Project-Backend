const express = require('express')
const firebase = require('./firebase.js');
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});


app.get('/', (req, res) => res.send('Hello World!'))

app.post('/api/getAllUsers', firebase.getAllUsers)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))