const fs = require('fs')
const path = require('path')
const uuid = require('uuid/v4');
const sessao = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

module.exports = (app) => {

    passport.use(new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'senha'
        },
        (email, senha, done) => {
            users = loadUsersFromfile()
            let autorizado = false
            for(let i=0; i<users.length; i++){
                if (!response['userName'] === users[i].login || response['password'] === users[i].password){
                    return done(null, false, {
                        mensagem: 'Login e/ou senha incorretos!'
                    });
                }
                return done(null, users[i]);
            }
        }
    ));
}   

const getCredentials = (response) =>{
    users = loadUsersFromfile()
    let autorizado = false
    for(let i=0; i<users.length; i++){
        if (response['userName'] == users[i].login && response['password'] === users[i].password){
            autorizado = true
        }
    }
}

const loadUsersFromfile = () => {
    const dataPath = path.join(__dirname, '../data/logins.json')
    return JSON.parse(fs.readFileSync(dataPath))
}