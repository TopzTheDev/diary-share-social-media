const mongoose = require('mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./keys');

//User Schema Model
const Users = mongoose.model('users');

module.exports = function(passport){

    passport.use(
        new GoogleStrategy({
            clientID: keys.googleClientId,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback',
            proxy: true
        },(accessToken, refreshToken, profile, done)=>{
            // console.log(accessToken);
            console.log(profile);

            // Removing the size indicated on image url link "?sz"
            const image = profile.photos[0].value.substring(0, profile.photos[0].value.indexOf('?'));

            // Storing the data on newUser object
            const newUser = {
                googleID: profile.id,
                email: profile.emails[0].value,
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                image: image
            }

            //Checking if the account is existing
            Users.findOne({
                googleID: profile.id
            })
            .then(user=>{

                if(user){
                    //Return user
                    console.log('User is exisiting and redirecting to dashboard');
                    done(null, user);
                }
                else{
                    // Create user
                    new Users(newUser)
                    .save()
                    .then(user=> {
                        console.log('User is created and redirecting to dashbaord');
                        done(null, user);
                    });
                }
            })
        })
    );

    passport.serializeUser((user, done)=>{
        done(null,user.id);
    })

    passport.deserializeUser((id, done)=>{
        Users.find({id}).then(user=> done(null, user))
    })
} 
