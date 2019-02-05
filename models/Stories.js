const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Stories Schema
const StoriesSchema = new Schema({



});

// Create collection and add Schema
mongoose.model('stories', StoriesSchema);