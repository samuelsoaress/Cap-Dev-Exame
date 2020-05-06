const fs = require('fs')
const path = require('path')
const uuid = require('uuid/v4');
const passport = require('passport');


var user = {}

module.exports = (app) => {

    passport.use(new LocalStrategy(
        {
            usernameField: 'userName',
            passwordField: 'senha'
        },
        (email, senha, done) => {
            users = loadUsersFromfile()
            let autorizado = false
            for (let i = 0; i < users.length; i++) {

                if (response['userName'] === users[i].login && response['password'] === users[i].password) {
                    return done(null, users[i]);
                    user['userName'] = users[i].login
                }
            }
            return done(null, false, {
                mensagem: 'Login e/ou senha incorretos!'
            });

        }
    ));

    passport.serializeUser((usuario, done) => {

        const usuarioSessao = {
            nome: user['userName']
        };

        done(null, usuarioSessao);
    });

    passport.deserializeUser((usuarioSessao, done) => {
        done(null, usuarioSessao);
    });

    app.use(sessao({
        secret: 'cap exame',
        genid: function(req) {
            return uuid();
        }, 
        resave: false,
        saveUninitialized: false
    }));

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