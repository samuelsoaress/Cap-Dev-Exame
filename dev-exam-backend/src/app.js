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
const http = require('follow-redirects').http;
const { Client } = require('node-rest-client-promise');
const nodeMailer = require('nodemailer')

const client = new Client();

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

app.use(cors({ origin: 'http://localhost:4200' }));

const getTechnology = () =>{
    let options = {
        headers: {
            'Content-Type': 'application/json',
        }
    };
    return client.getPromise('http://bralpsvvwas02:8083/tecnologia/', options).then((response) => (response));
}

app.get('/tecnologia', async(req, res, next) => {
    let response = await getTechnology()
    console.log(response)
    return res.json(response.data)
});

app.post('/authenticate', auth(), (req, res) => {
    res.status(200).json({ "statusCode": 200, "user": req.user });
});

app.post('/answers', cors(), (req, res, next) => {
    try {
        console.log("entrou")
        let requestData = req.body
        questions.validateAnswers(requestData, req.query.code)
        return res.status(200).json({ "statusCode": 200, "message": "email sent" })
        next()
    }
    catch (error) {
        console.log(error)
        next(error)
    }

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

app.get('/exam', cors(), async (req, res, next) => {

    if (!req.query.code) {
        return res.send({
            error: 'Voce precisa fornecer um codigo de exame.'
        })
    }

    let exam = await exams.getExam(req.query.code)
    res.send(exam)
})

app.get('/questions', cors(), (req, res, next) => {
    res.send(questions.getQuestions(MAX_QUESTIONS))
})


app.post('/newExam', cors(), (req, res, next) => {
    let requestData = req.body
    console.log(requestData)
    exams.getNewExam(requestData)
})

app.post('/user/login', cors(), (req, res, next) => {
    let request = req.body
    let autorized = login.getCredentials(request)
})

const getCandidate = (request, codeAcess) => {
    console.log("2")
    console.log(codeAcess)
    let name = request['nomeCandidato']
    let nameGestor = request['emailGestor']
    let emailbody = "<p>Prezado " + name + " ,</p>"
    emailbody += "<p>Você está recebendo este e-mail pois foi indicado para realizar o teste " + request["nomeTeste"] + "  por " + nameGestor + " </p>"
    emailbody += "<p>Abaixo segue as informações para realizar a prova</p>"
    emailbody += "<p>Código de autorização:  " + codeAcess + " </p>"
    emailbody += "<p>Ou se preferir, acessar o link abaixo.</p>"
    emailbody += "<p>https://wwww.sdafdfasdfasd.com/exam?code=" + codeAcess + "</p>"
    emailbody += "<p>Atenciosamente</p>"
    return emailbody
}


const requestAuthorizator = (request) => {
    console.log(1)
    let data = {}
    data['email'] = request.email
    data['emailGestor'] = request.emailGestor
    let options = {
        data: data,
        headers: {
            'Content-Type': 'application/json',
        }
    };

    return client.postPromise('http://bralpsvvwas02:8083/autorizador/', options).then((response) => (response))

}


app.post('/autorizador', cors(), async (req, res, next) => {
    let request = req.body
    console.log(request)

    let response = await requestAuthorizator(request)

    let emailbody = getCandidate(request, response.data.autorizador)

    email.sendCandidate(emailbody, request['email'], request)

});

app.listen(3000, () => console.log('Server listening on port 3000'))