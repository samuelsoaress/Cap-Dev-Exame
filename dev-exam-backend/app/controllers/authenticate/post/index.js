const { post } = require('../../../services/request');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
    function (username, password, done) {
        if (username === "admin" && password === "admin") {
            return done(null, username);
        } else {
            return done("unauthorized access", false);
        }
    }
));

passport.serializeUser(function (user, done) {
    if (user) done(null, user);
});


const isLoggedIn = (req, res, next) => {
    console.log('session ', req.session);
    if (req.isAuthenticated()) {
        //console.log('user ', req.session.passport.user)
        return next()
    }
    return res.status(400).json({ "statusCode": 400, "message": "not authenticated" })
}

passport.deserializeUser(function (id, done) {
    done(null, id);
});

const auth = () => {
    return (req, res, next) => {
        passport.authenticate('local', (error, user, info) => {
            if (error) {
                return res.status(400).json({ "statusCode": 200, "message": error });
            }
            req.login(user, function (error) {
                if (error) return next(error);
                next();
            
            });
        })(req, res, next);
    }
}


module.exports = {
    auth: auth
}