const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {ensureAuthenticated,ensureGuest} = require('../helpers/auth');
const isAllowed = require('../helpers/isAllowed');
const dateConvert = require('../helpers/dateConvert');
const Diary = mongoose.model('diaries');


//Populate all user diary
router.get('/', (req, res)=>{
    Diary.find({status:'public'})
    .populate('user')
    .then(diaries=>{
        let newDiaries = (dateConvert(diaries));
        res.render('diaries/index',{newDiaries});
    });
});
// Show single Diary 
router.get('/show/:id',(req,res)=>{

    Diary.findById(req.params.id)
    .populate('user')
    .then(diary =>{
        console.log(diary);
        res.render('diaries/show',{diary});
    });

});

//Add diary
router.get('/add',ensureAuthenticated,(req,res)=>{

    res.render('stories/add');
});

router.get('/edit/:id',(req,res)=>{

    Diary.findById(req.params.id)
    .then(diary => 
        res.render('diaries/edit',{diary})
    )
    

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
    new Diary(newDiary)
        .save()
        .then(story=>{
            res.redirect(`/diaries/show/${story.id}`);
        })
        .catch(err=>console.log(err));

    
})

// PUT Method here ===========
router.put('/:id', (req,res)=>{

    
    Diary.findById(req.params.id)
    .then(diary =>{

        diary.title= req.body.title
        diary.body= req.body.bodyEdit
        diary.allowComments= isAllowed(req.body.allowComments)
        diary.status= req.body.status

        diary.save()
        .then(()=>{
            res.redirect('/feed');
        })  

    })


})

// DELETE Request method here ===========
router.delete('/:id', (req,res)=>{


    Diary.remove({_id: req.params.id})
    .then(()=>{
        res.redirect('/feed');
    })

})

module.exports = router;