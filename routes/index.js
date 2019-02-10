const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Diary = mongoose.model('diaries');
const dateConvert = require('../helpers/dateConvert');
const {ensureAuthenticated,ensureGuest} = require('../helpers/auth');

router.get('/',ensureGuest, (req,res)=>{

    res.render('index/welcome');

});

router.get('/feed',ensureAuthenticated, (req, res)=>{

    Diary.find({user: req.user.id})
    .populate('user')
    .then(diaries => {
        diaries = dateConvert(diaries);
        res.render('index/feed',{diaries});
    });
    
});

module.exports = router;
