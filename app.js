const express = require('express')
const firebase = require('./firebase.js');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(function(req,res,next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})


app.get('/', (req, res) => res.send('Hello World!'))

app.post('/api/getAllUsers', firebase.getAllUsers)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))