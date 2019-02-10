module.exports = {
    ensureAuthenticated: (req,res,next)=>{

        if(req.isAuthenticated()){
            return next();
        }
        res.redirect('/');
    },
    ensureGuest: (req,res,next)=>{

        if(req.isAuthenticated()){
            res.redirect('/feed');
        }
        else{
            return next();
        }
    }
}