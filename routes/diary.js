const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { ensureAuthenticated, ensureGuest } = require('../helpers/auth');
const isAllowed = require('../helpers/isAllowed');
const dateConvert = require('../helpers/dateConvert');
const Diary = mongoose.model('diaries');
const User = mongoose.model('users');
const verifyUser = require('../helpers/verifyUser');

//Populate all user diary
router.get('/', (req, res) => {
    Diary.find({ status: 'public' })
        .populate('user')
        .sort({ date: 'desc' })
        .then(diaries => {
            let newDiaries = verifyUser((dateConvert(diaries)));
            res.render('diaries/index', { newDiaries });
        });
});
// Show single Diary 
router.get('/show/:id', (req, res) => {

    Diary.findById(req.params.id)
        .populate('user')
        .populate('comments.commentUser')
        .then(diary => {
            res.render('diaries/show', { diary });
        });

});

//Add diary
router.get('/add', ensureAuthenticated, (req, res) => {

    res.render('stories/add');
});

router.get('/edit/:id',ensureAuthenticated,(req, res) => {

    Diary.findById(req.params.id)
        .then(diary => {

            if (diary.user.id !== req.user.id) {
                res.redirect('/diaries');
            } else {
                res.render('diaries/edit', { diary })
            }
        }
        )
});

//Handling post request
router.post('/',ensureAuthenticated, (req, res) => {

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
        .then(story => {
            res.redirect(`/diaries/show/${story.id}`);
        })

})

// PUT Method here ===========
router.put('/:id',ensureAuthenticated, (req, res) => {


    Diary.findById(req.params.id)
        .then(diary => {

            diary.title = req.body.title
            diary.body = req.body.bodyEdit
            diary.allowComments = isAllowed(req.body.allowComments)
            diary.status = req.body.status

            diary.save()
                .then(() => {
                    res.redirect('/feed');
                })

        })


})

// DELETE Request method here ===========
router.delete('/:id',ensureAuthenticated, (req, res) => {


    Diary.remove({ _id: req.params.id })
        .then(() => {
            res.redirect('/feed');
        })

})


// GET Comment Reques ==============
router.post('/comment/:id',ensureAuthenticated,(req, res) => {

    Diary.findById(req.params.id)
        .then(diary => {

            const newComment = {
                commentBody: req.body.commentBody,
                commentUser: req.user.id
            }

            diary.comments.unshift(newComment);

            diary.save()
                .then(story => {
                    res.redirect(`/diaries/show/${story.id}`);
                })

        })


});


module.exports = router;