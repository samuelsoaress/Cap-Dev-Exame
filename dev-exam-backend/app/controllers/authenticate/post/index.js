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

const auth = (req, res) => {
    if (!req.body.email || !req.body.password) {
        res.status(401).json({ message: 'Parameters are missing' });
    } else {
        try {
            const checkEmail = req.body.email === 'admin'
            const checkPassword = req.body.password === 'admin'
            if (checkPassword && checkPassword) {
                res.status(200).json({ message: 'Logged in successfully!', result: checkPassword[0], token: 'dummy-jwt-token-for-now' });
            } else {
                res.status(401).json({ message: 'Incorrect password' });
            }
        } catch (error) {
            res.status(401).json({ message: 'Something went wrong', error: error });
        }
    }
}
// return (req, res, next) => {
//     passport.authenticate('local', (error, user, info) => {
//         if (error) {
//             return res.status(400).json({ "statusCode": 200, "message": error });
//         }
//         req.login(user, function (error) {
//             if (error) return next(error);
//             next();

//         });
//     })(req, res, next);
// }


module.exports = {
    auth: auth
}