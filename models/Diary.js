const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Stories Schema
const DiarySchema = new Schema({

    title:{
        type: String,
        required: true
    },

    body:{
        type: String,
        required: true
    },

    status:{
        type:String,
        default: 'public'
    },

    rand:{
        type: Number,
        default: Math.floor(Math.random() * 6 ) + 1
    },

    allowComments:{
        type: Boolean,
        default: true
    }, 

    comments: [{
        commentBody:{
            type: String,
            required: true
        },
        commentDate:{
            type: Date,
            default: Date.now
        },
        commentUser:{
            type: Schema.Types.ObjectId,
            ref: 'users'
        }
    }],

    user:{
        type: Schema.Types.ObjectId,
        ref: 'users'
    },

    date:{
        type: Date,
        default: Date.now
    }


});

// Create collection and add Schema
mongoose.model('diaries', DiarySchema, 'diaries');