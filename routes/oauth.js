const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/google', passport.authenticate('google',{
    scope: ['profile', 'email']
}));

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res)=>{

    res.redirect('/dashboard');
    // res.render('index/dashboard',{user: req.user});
  });

router.get('/verify',(req,res)=>{

    if(req.user){
        console.log('User verified',req.user);
    }else{
        console.log('Not Authorized');
    }
});

router.get('/logout',(req,res)=>{

    req.logout();
    res.redirect('/');

});

module.exports = router;

