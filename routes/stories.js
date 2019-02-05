const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {ensureAuthenticated,ensureGuest} = require('../helpers/auth');

require('../models/Stories');
const Stories = mongoose.model('stories');

router.get('/',ensureAuthenticated, (req, res)=>{
    res.render('stories/index');
});

router.get('/add',ensureAuthenticated,(req,res)=>{

    res.render('stories/add');
});

router.get('/edit/:id',ensureAuthenticated,(req,res)=>{

    res.render('stories/edit');
});

module.exports = router;