const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create User Schema

const UserSchema = new Schema({

    googleID:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    firstName:{
        type: String

    },
    lastName:{
        type: String
    },
    image:{
        type: String
    },
    coverPhoto:{
        type: String
    }
})


// Create collection and add Schema
mongoose.model('users',UserSchema);