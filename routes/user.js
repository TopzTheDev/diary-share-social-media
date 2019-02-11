const express =  require('express');
const Router = express.Router();
const mongoose = require('mongoose');
const Diary = mongoose.model('diaries');
const User = mongoose.model('users');
const { ensureAuthenticated, ensureGuest } = require('../helpers/auth');
Router.get('/:userID',ensureAuthenticated,(req,res)=>{
    

    if(req.params.userID === req.user.id){
        Diary.find({user: req.user.id})
        .populate('user')
        .then(diaries =>{
            User.findById(req.user.id)
            .then(user =>{
                res.render('user/',{user,diaries});
            })
        })
    }else{
        Diary.find({user: req.params.userID, status: 'public'})
        .populate('user')
        .then(diaries =>{
            User.findById(req.params.userID)
            .then(user =>{
                res.render('user/',{user,diaries});
            })
        })
    }
   
    
})


module.exports = Router;