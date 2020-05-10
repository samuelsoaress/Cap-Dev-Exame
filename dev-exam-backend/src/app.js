const questions = require('./questions')
const exams = require('./exams')
const email = require('./email')
const session = require('express-session')
const cors = require('cors')
const bodyParser = require('body-parser')
const config = require('config')
const express = require('express')
const app = express()
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const MAX_QUESTIONS = config.get('Config.api.maxQuestions')

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

// Enable cors
app.options('*', cors())

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

app.use(cors({origin: 'http://localhost:4200'}));
    


app.post('/authenticate', auth(), (req, res) => {
    res.status(200).json({ "statusCode": 200, "user": req.user });
});

const isLoggedIn = (req, res, next) => {
    console.log('session ', req.session);
    if (req.isAuthenticated()) {
        //console.log('user ', req.session.passport.user)
        return next()
    }
    return res.status(400).json({ "statusCode": 400, "message": "not authenticated" })
}

app.get('/getData', isLoggedIn, (req, res) => {
    res.json("data is")
})

app.get('/exam', cors(), (req, res, next) => {

    if (!req.query.code) {
        return res.send({
            error: 'Voce precisa fornecer um codigo de exame.'
        })
    }

    res.send(exams.getExam(req.query.code))
})

app.get('/questions', cors(), (req, res, next) => {
    res.send(questions.getQuestions(MAX_QUESTIONS))
})

app.post('/answers', cors(), (req, res, next) => {
    let requestData = req.body
    questions.validateAnswers(requestData)
})

app.post('/newExam', cors(), (req, res, next) => {
    let requestData = req.body
    exams.getNewExam(requestData)
})

app.post('/user/login', cors(), (req, res, next) => {
    let request = req.body
    let autorized = login.getCredentials(request)
})

const getCandidate = (request) =>{
    console.log("entrou na getcandidate")
    let nome = request['nomeCandidato']
    let emailbody = "<p>Prezado "+ nome +" NOME DO CANDIDATO,<p>"
    emailbody += "<p>Você está recebendo este e-mail pois foi indicado para realizar o teste nomeTeste  por XXXXX NOME DO GESTOR RESPONSAVEL XXXXXX </p>"
    emailbody += "<p>Abaixo segue as informações para realizar a prova</p"
    emailbody += "<p>Código de autorização:  XXFFDSFDsdfsdf </p>"
    emailbody += "<p>Ou se preferir, acessar o link abaixo.</p>"
    emailbody += "<p>https://wwww.sdafdfasdfasd.com/codigoautorizacao</p>"
    emailbody += "<p>Atenciosamente</p>"
    return emailbody
}

app.post('/candidate', cors(), (req, res, next) => {
    let request = req.body
    
    let emailbody = getCandidate(request)
    email.sendCandidate(emailbody,request['email']);    

})

app.listen(3000, () => console.log('Server listening on port 3000'))