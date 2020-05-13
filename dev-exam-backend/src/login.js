const fs = require('fs')
const path = require('path')
const uuid = require('uuid/v4');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;



var user = {}

module.exports = (app) => {

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
    
    passport.deserializeUser(function (id, done) {
        done(null, id);
    });
    
    app.use(session({ secret: 'anything', resave: true, saveUninitialized: true }));
    app.use(passport.initialize());
    app.use(passport.session());
    
    const auth = () => {
        return (req, res, next) => {
            passport.authenticate('local', (error, user, info) => {
                if (error) res.status(400).json({ "statusCode": 200, "message": error });
                req.login(user, function (error) {
                    if (error) return next(error);
                    next();
                });
            })(req, res, next);
        }
    }

    const isLoggedIn = (req, res, next) => {
        console.log('session ', req.session);
        if (req.isAuthenticated()) {
            //console.log('user ', req.session.passport.user)
            return next()
        }
        return res.status(400).json({ "statusCode": 400, "message": "not authenticated" })
    }
    

    app.use(passport.initialize());
    app.use(passport.session());
}

const getCredentials = (response) => {
    users = loadUsersFromfile()
    let autorizado = false
    for (let i = 0; i < users.length; i++) {
        if (response['userName'] == users[i].login && response['password'] === users[i].password) {
            autorizado = true
        }
    }
}

const loadUsersFromfile = () => {
    const dataPath = path.join(__dirname, '../data/logins.json')
    return JSON.parse(fs.readFileSync(dataPath))
}