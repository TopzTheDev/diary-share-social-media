const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const keys = require('./config/keys');


const app = express();
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars');

// Load model here....
// =========="USER MODEL"==========
require('./models/Users');


// Passport config
require('./config/passport')(passport);

// load routes
const auth = require('./routes/oauth');
const index = require('./routes/index');

// Map global promises
mongoose.Promise = global.Promise;

// Mongoose Connect
mongoose.connect(keys.mongoURI,{
    useNewUrlParser: true
})
.then(()=>console.log('Database Server Connected...'))
.catch((err)=>console.log('Database server connection ERROR!...',err));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());

app.get('/',(req,res)=>{
    res.send('Hello World');
});

app.use(cookieParser());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));
 
//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

//Set gloval variables
app.use((req,res, next)=>{

    res.locals.user = req.use || null;

    next();
})

// Use routes
app.use('/auth',auth);
app.use(index);

const port = process.env.PORT || 5000; 

app.listen(port, ()=>{
    console.log(`The server has been started ${port}`);
});