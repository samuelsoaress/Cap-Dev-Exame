const fs = require('fs')
const path = require('path')
const _ = require('lodash');
const email = require('./email')
const conversion = require("phantom-html-to-pdf")();

const getQuestions = (maxQuestions) => {
    let questions = loadQuestionsFromfile()

    if (maxQuestions > questions.length) {
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
    while (randomQuestions.length < maxQuestions) {
        let randomNumber = Math.floor(Math.random() * questions.length);;
        let randomQuestion = questions[randomNumber]
        let found = randomQuestions.find((q) => q.code === randomQuestion.code)
        if (found === undefined) {
            randomQuestions.push(randomQuestion)
        }
    }
    return randomQuestions
}

const getAllQuestions = () => {
    let questions = loadQuestionsFromfile()
    return questions = removeCorrectAnswer(questions)
}

const replace = (array) => {
    let coding = ""
    for (let i = 0; i < array.length; i++) {
        coding += array[i] + "<br>"
    }
    return coding
}

const validateAnswers = (requestData) => {
    let questions = loadQuestionsFromfile()
    let candidateName = requestData['candidateName']
    let answersFromCandidate = _.omit(requestData, ['candidateName'])
    let candidateRightAnswers = 0
    let candidateWrongAnswers = 0
    let totalQuestions = 0
    let emailBody2 = '<head><meta charset="utf-8"></head>'
    emailBody2 += '<p><b>Resultado Avaliação Candidato</b></p>'
    let emailBody = '<br>'
    emailBody2 += `<p>Candidato: ${candidateName}</p>`
    let contQuestion = 1
    let technologys = new Set();
    let examComplexity = []

    _.forOwn(answersFromCandidate, function (value, key) {
        let correctAnswer = questions.find((question) => question.code === (key.toString())).correctAnswer
        let question = questions.find((question) => question.code === (key.toString())).lastPart
        let code = questions.find((question) => question.code === (key.toString())).codeParts
        let answers = questions.find((question) => question.code === (key.toString())).answers
        let technology = questions.find((question) => question.code === (key.toString())).technology
        let complexity = questions.find((question) => question.code === (key.toString())).complexity
        examComplexity.push(complexity)
        technologys.add(technology)
        emailBody += '<p style="color:#000000 "><b>Pergunta: ' + contQuestion + " " + question + '</b></p>'

        if (code.length <= 1) {
            emailBody += ""

        } else {
            emailBody += '<pre style="color:#000000;background-color:#eeeff5;border-radius:10px;box-shadow:1px 2px 4px rgba(0, 0, 0, 0.5);width:700px;"><b><p style="margin-left: 10em;">' + replace(code) + '</p></b></pre>'
        }

        for (let j = 0; j < answers.length; j++) {
            if (answers[j].letter === correctAnswer) {
                if (answers[j].letter === value) {
                    if ((answers.length -1) === (answers.indexOf(answers[j]))){    
                        emailBody += '<p style="color:#009000 " ><b>(X) ' + answers[j].letter + ' ' + answers[j].text + '</b></p><br>'
                    }else{
                        emailBody += '<p style="color:#009000 " ><b>(X) ' + answers[j].letter + ' ' + answers[j].text + '</b></p>'
                    }
                }
                else {
                    if ((answers.length -1) === (answers.indexOf(answers[j]))){    
                        emailBody += '<p style="color:#009000 " ><b>( ) ' + answers[j].letter + ' ' + answers[j].text + '</b></p><br>'
                    }else{
                        emailBody += '<p style="color:#009000 " ><b>( ) ' + answers[j].letter + ' ' + answers[j].text + '</b></p>'
                    }
                }

            } else {
                if (answers[j].letter === value) {
                    if ((answers.length -1) === (answers.indexOf(answers[j]))){
                        emailBody += '<p style="color:#900000 " ><b>(X) ' + answers[j].letter + ' ' + answers[j].text + '</b></p><br>'    
                    }else{
                        emailBody += '<p style="color:#900000 " ><b>(X) ' + answers[j].letter + ' ' + answers[j].text + '</b></p>'
                    }
                }
                else {
                    if ((answers.length -1) === (answers.indexOf(answers[j]))){
                        emailBody += '<p style="color:#000000 "><b>( ) ' + answers[j].letter + ' ' + answers[j].text + '</b></p><br>'
                    }else{
                        emailBody += '<p style="color:#000000 "><b>( ) ' + answers[j].letter + ' ' + answers[j].text + '</b></p>'
                    }
                }
            }
        }
        correctAnswer === value ? candidateRightAnswers++ : candidateWrongAnswers++
        totalQuestions += 1
        contQuestion += 1
    });

    let basic = 0;
    let medium = 0;
    let hard = 0;
    let bigger = ""

    for (var i = 0; i < examComplexity.length; i++) {
        if (examComplexity[i] == 'basic')
            basic += 1
        else if (examComplexity[i] == 'medium')
            medium += 1
        else if (examComplexity[i] == 'hard')
            hard += 1
    }
    if (basic > medium && basic > hard)
        bigger = "basico"
    else if (medium > basic && medium > hard)
        bigger = "medio"
    else if (hard > basic && hard > medium)
        bigger = "dificil"
    else if (basic == medium)
        bigger = "basico/medio"
    else if (medium == hard)
        bigger = "medio/dificil"

    let technology = ""
    for (let item of technologys) {
        technology += " " + item
    }

    emailBody2 += '<p><b> Tipo de prova:' + technology + '</p></b>'
    emailBody2 += '<p><b> Complexidade: ' + bigger + '</p></b>'
    emailBody2 += '<p><b>Total de respostas certas: ' + candidateRightAnswers + '</b></p>'
    emailBody2 += '<p><b>Total de respostas erradas: ' + candidateWrongAnswers + '</b></p>'
    emailBody2 += '<p><b>Porcentagem de acertos: '
        + calculateHitPercentage(totalQuestions, candidateRightAnswers) + ' %</b></p>'


    emailBody2 += emailBody


    conversion({ html: emailBody2 }, function (err, pdf) {
        let output = fs.createWriteStream('./Anexos/' + candidateName + '.pdf')
        pdf.stream.pipe(output);
    });

    let email2 =  {
        attachments: [{ 
            filename: candidateName + '.pdf', 
            path: './Anexos/' + candidateName + '.pdf'
        }]
    }
    email.sendEmail(email2)
}

const loadQuestionsFromfile = () => {
    const dataPath = path.join(__dirname, '../data/questions.json')
    return JSON.parse(fs.readFileSync(dataPath))
}

const calculateHitPercentage = (totalQuestions, candidateRightAnswers) => {
    return ((candidateRightAnswers * 100) / totalQuestions).toFixed(2)
}

module.exports = {
    getQuestions: getQuestions,
    getAllQuestions: getAllQuestions,
    validateAnswers: validateAnswers
}
