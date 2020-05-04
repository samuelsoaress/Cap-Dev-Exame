const questions = require('./questions')
const exams = require('./exams')
const cors = require('cors')
const bodyParser = require('body-parser')
const config = require('config')
const express = require('express')
const notes = require('./exams.js')
const yargs = require('yargs')
const app = express()


const MAX_QUESTIONS = config.get('Config.api.maxQuestions')

yargs.version('1.1.0')
// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

// Enable cors
app.options('*', cors())

app.get('/exam', cors(), (req, res, next) => {

    if (!req.query.code) {
        return res.send({
            error: 'Voce precisa fornecer um codigo de exame.'
        })
    }

    res.send(exams.getExam(req.query.code))
})

yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        questionsConfig: {
            technology: '',
            numberOfQuestions: 0,
            complexity: ''
        }
    },
    handler(argv) {
        notes.addNote(argv.technology, argv.numberOfQuestions, argv.complexity)
    }
})

app.get('/questions', cors(), (req, res, next) => {
    res.send(questions.getQuestions(MAX_QUESTIONS))
})

app.post('/answers', cors(), (req, res, next) => {
    let requestData = req.body
    questions.validateAnswers(requestData)
})

app.post('/newExam', cors(), (req, res, next) => {
    let requestDict = req.body
    exams.getNewExam(requestDict)
})
yargs.parse()

app.listen(3000, () => console.log('Server listening on port 3000'))