const fs = require('fs')
const path = require('path')
const _ = require('lodash');
const email = require('./email')

const getQuestions = (maxQuestions) => {
    let questions = loadQuestionsFromfile()

    if(maxQuestions > questions.length){
        throw "erro: requisitando número de questões maior do que o número de questões no banco!"
    }

    questions = removeCorrectAnswer(questions)
    questions = randomQuestions(questions, maxQuestions)
    return questions
}

const removeCorrectAnswer = (questions) => {
    return questions.map((question) => _.omit(question, ['correctAnswer']))
}

const randomQuestions = (questions, maxQuestions) => {
    let randomQuestions = []
    while(randomQuestions.length < maxQuestions){
        let randomNumber = Math.floor(Math.random() * questions.length);;
        let randomQuestion = questions[randomNumber]
        let found = randomQuestions.find((q) => q.code === randomQuestion.code)
        if(found === undefined){
            randomQuestions.push(randomQuestion)
        }
    }
    return randomQuestions
}

const validateAnswers = (requestData) => {
    let questions = loadQuestionsFromfile()
    let candidateName = requestData['candidateName']
    let answersFromCandidate = _.omit(requestData, ['candidateName'])
    let candidateRightAnswers = 0
    let candidateWrongAnswers = 0
    let totalQuestions = 0
    let emailBody = '<p><b>Resultado Avaliação Candidato</b></p>'

    emailBody += `<p>Candidato: ${candidateName}</p>`

    _.forOwn(answersFromCandidate, function(value, key) {
        let correctAnswer = questions.find((question) => question.code === (key.toString())).correctAnswer
        emailBody += '<p>Questão número: ' + key + '</p>'
        emailBody += '<p>Resposta do candidato: ' + value + '</p>'
        emailBody += '<p>Resposta certa: ' + correctAnswer + '</p>'

        correctAnswer === value ? candidateRightAnswers++ : candidateWrongAnswers++
        totalQuestions += 1
    });

    emailBody += '<p><b>Total de respostas certas: ' + candidateRightAnswers + '</b></p>'
    emailBody += '<p><b>Total de respostas erradas: ' + candidateWrongAnswers + '</b></p>'
    emailBody += '<p><b>Porcentagem de acertos: ' 
        + calculateHitPercentage(totalQuestions, candidateRightAnswers) + ' %</b></p>'

    email.sendEmail(emailBody)
}

const loadQuestionsFromfile = () => {
    const dataPath = path.join(__dirname, '../data/questions.json')
    return JSON.parse(fs.readFileSync(dataPath))
}

const calculateHitPercentage = (totalQuestions, candidateRightAnswers) => {
    return ((candidateRightAnswers*100)/totalQuestions).toFixed(2)
}

module.exports = {
    getQuestions: getQuestions,
    validateAnswers: validateAnswers
}
