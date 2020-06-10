const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { get } = require('../../../services/request')

const url = "http://bralpsvvwas02:8083/"

// passport.use(new LocalStrategy(
//     function (username, password, done) {
//         if (username === "admin" && password === "admin") {
//             return done(null, username);
//         } else {
//             return done("unauthorized access", false);
//         }
//     }
// ));

// passport.serializeUser(function (user, done) {
//     if (user) done(null, user);
// });

const getAutorization = async (req, res) => {
    const autorizator = url + "autorizador/"
    const request = req.app.get('hystrix').hystrixRequestHandler(get, 'Autenticando candidato');
    // return client.getPromise('http://bralpsvvwas02:8083/composicao-prova/', options).then((response) => (response))
    console.log(autorizator);
    return request.execute(
        autorizator,
        req,
        res
    );
}

// const isLoggedIn = (req, res, next) => {
//     console.log('session ', req.session);
//     if (req.isAuthenticated()) {
//         //console.log('user ', req.session.passport.user)
//         return next()
//     }
//     return res.status(400).json({ "statusCode": 400, "message": "not authenticated" })
// }

// passport.deserializeUser(function (id, done) {
//     done(null, id);
// });

const auth = async (req, res) => {
    let response = await getAutorization(req, res);
    if (!req.body.email || !req.body.password) {
        res.status(401).json({ message: 'Parameters are missing' });
    } else {
        try {
            for(let element of response.data){
                console.log(element)

                let checkEmail = (String(req.body.email) === String(element.email))
                let checkPassword = (String(req.body.password) === String(element.autorizador))
                console.log(checkEmail)
                console.log(checkPassword)
                if ((checkEmail) && (checkPassword)) {
                    return res.status(200).json({ message: 'Logged in successfully!', token: 'token-for-'+element.email+'-'+element.autorizador });
                }
            }
            return res.status(401).json({ message: 'Incorrect code or email' });
        } catch (error) {
            console.log(error)
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