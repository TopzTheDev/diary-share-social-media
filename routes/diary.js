const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {ensureAuthenticated,ensureGuest} = require('../helpers/auth');
const isAllowed = require('../helpers/isAllowed');

const Stories = mongoose.model('diaries');

router.get('/',ensureAuthenticated, (req, res)=>{
    res.render('stories/index');
});

router.get('/add',ensureAuthenticated,(req,res)=>{

    res.render('stories/add');
});

router.get('/edit/:id',ensureAuthenticated,(req,res)=>{

    res.render('stories/edit');
});

//Handling post request
router.post('/',(req,res)=>{
    
    const newDiary = {
        title: req.body.title,
        body: req.body.body,
        status: req.body.status,
        allowComments: isAllowed(req.body.allowComments),
        user: req.user.id
    }

    //Create Story
    new Stories(newDiary)
        .save()
        .then(story=>{
            res.redirect(`/stories/show/${story.id}`);
        })
        .catch(err=>console.log(err));

    
})

module.exports = router;