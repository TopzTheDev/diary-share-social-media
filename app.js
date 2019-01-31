const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const {mongoURI} = require('./config/keys');
const app = express();

// Passport config
require('./config/passport')(passport);

// load routes
const auth = require('./routes/oauth');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());

app.get('/',(req,res)=>{
    res.send('Hello World');
});

// Use routes

app.use('/auth',auth);

const port = process.env.PORT || 5000; 

app.listen(port, ()=>{
    console.log(`The server has been started ${port}`);
});