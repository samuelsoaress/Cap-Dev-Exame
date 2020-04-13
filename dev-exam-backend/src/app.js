const questions = require('./questions')
const exams = require('./exams')
const cors = require('cors')
const bodyParser = require('body-parser')
const config = require('config')
const express = require('express')
const app = express()

const MAX_QUESTIONS = config.get('Config.api.maxQuestions')

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

// Enable cors
app.options('*', cors())

app.get('/exams', cors(), (req, res, next) => {
    res.send(exams.getExams())
})

app.get('/questions', cors(), (req, res, next) => {
    res.send(questions.getQuestions(MAX_QUESTIONS))
})

app.post('/answers', cors(), (req, res, next) => {
    let requestData = req.body
    questions.validateAnswers(requestData)
})

app.listen(3000, () => console.log('Server listening on port 3000'))