const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());

app.get('/',(req,res)=>{
    res.send('Hello World');
});

const port = process.env.PORT || 5000; 

app.listen(port, ()=>{
    console.log(`The server has been started ${port}`);
});