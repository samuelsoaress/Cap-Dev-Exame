const fs = require('fs')
const path = require('path')
const _ = require('lodash');
const email = require('./email')
const conversion = require("phantom-html-to-pdf")()
const EventEmitter = require('events');
const { Client } = require('node-rest-client-promise');

const client = new Client();

const getQuestions = (maxQuestions) => {
    let questions = loadQuestionsFromfile()

    if (maxQuestions > questions.length) {
        throw "erro: requisitando número de questões maior do que o número de questões no banco!"
    }

    questions = removeCorrectAnswer(questions)
    questions = randomQuestions(questions, maxQuestions)
    return questions
}

const answerCorrect = (answer, value, correctAnswer, answers) => {
    let emailBody = ''
    if (answer.letter === correctAnswer) {
        if (answer.letter === value) {
            if ((answers.length - 1) === (answers.indexOf(answer))) {
                emailBody += '<p style="color:#009000 " >(X) ' + answer.letter + ' ' + answer.text + '</p><br><br>'
            } else {
                emailBody += '<p style="color:#009000 " >(X) ' + answer.letter + ' ' + answer.text + '</p>'
            }
        }
        else {
            if ((answers.length - 1) === (answers.indexOf(answer))) {
                emailBody += '<p style="color:#009000 " >( ) ' + answer.letter + ' ' + answer.text + '</p><br><br>'
            } else {
                emailBody += '<p style="color:#009000 " >( ) ' + answer.letter + ' ' + answer.text + '</p>'
            }
        }
        return emailBody
    }
    if (answer.letter === value) {
        if ((answers.length - 1) === (answers.indexOf(answer))) {
            emailBody += '<p style="color:#900000 " >(X) ' + answer.letter + ' ' + answer.text + '</p><br><br>'
        } else {
            emailBody += '<p style="color:#900000 " >(X) ' + answer.letter + ' ' + answer.text + '</p>'
        }
    }
    else {
        if ((answers.length - 1) === (answers.indexOf(answer))) {
            emailBody += '<p style="color:#000000 ">( ) ' + answer.letter + ' ' + answer.text + '</p><br><br>'
        } else {
            emailBody += '<p style="color:#000000 ">( ) ' + answer.letter + ' ' + answer.text + '</p>'
        }
    }

    return emailBody
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

const transformEmail = (candidateName) => {
    console.log("entrou na função tranformEmail");
    if (!(fs.existsSync('./Anexos/' + candidateName + '.pdf'))) {
        console.log("entrou no if verificando a existencia do pdf");
    }
    let cont = 0
    while ((fs.existsSync('./Anexos/' + candidateName + '.pdf') === false)) {
        console.log("pdf ainda não gerado tentativa = " + cont);
        cont++
    }
    if (fs.existsSync('./Anexos/' + candidateName + '.pdf')) {
        console.log(2)
        let email2 = {
            attachments: [{
                filename: candidateName + '.pdf',
                path: './Anexos/' + candidateName + '.pdf'
            }]
        }
        console.log("acima do metodo");
        email.sendEmail(email2, candidateName);

    }
}

const validateAnswers = async (requestData, code) => {
    console.log(requestData)
    let questions = loadQuestionsFromfile()
    let candidateName = requestData['candidateName']
    let answersFromCandidate = _.omit(requestData, ['candidateName'])
    let candidateRightAnswers = 0
    let candidateWrongAnswers = 0
    let totalQuestions = 0
    let emailBody2 = '<head><meta charset="utf-8"></head><style>div, p, h2{font-family: Calibri, Candara, Segoe, "Segoe UI", Optima, Arial, sans-serif;}</style>'
    emailBody2 += '<div style="display:-webkit-box;display: -ms-flexbox;display: flex;-ms-flex-wrap: wrap; flex-wrap: wrap;margin-right: -15px;margin-left: -15px;">'
    emailBody2 += '<div style="flex-basis: 0;flex-grow: 1;"><h2 style="padding-left: 17px; padding-top: 20px;"><b>Resultado da Avaliação</b></h2></div>'
    emailBody2 += '<div style="flex-basis: 0;flex-grow: 1;"><img style="padding: 15px;margin-left:500px;width: 220px;box-sizing: border-box;float: right;" src="https://capgemini.github.io/images/logo.svg?v=2"></div></div>'
    let emailBody = '<br>'
    emailBody2 += `<p style="border-top:solid #3770ad;"></p><p style="font-size:18px;"> <b>Candidato:</b> ${candidateName}</p>`
    let contQuestion = 1
    let technologys = new Set();
    let examComplexity = []

    _.forOwn(answersFromCandidate, function (value, key) {
        console.log(key, "", value)
        let correctAnswer = questions.find((question) => question.code === (key.toString())).correctAnswer
        let question = questions.find((question) => question.code === (key.toString())).lastPart
        let firstStatement = questions.find((question) => question.code === (key.toString())).firstPart
        let code = questions.find((question) => question.code === (key.toString())).codeParts
        let answers = questions.find((question) => question.code === (key.toString())).answers
        let technology = questions.find((question) => question.code === (key.toString())).technology
        let complexity = questions.find((question) => question.code === (key.toString())).complexity
        examComplexity.push(complexity)
        technologys.add(technology)
        emailBody += '<p style="color:#000000 "><b>Pergunta: ' + contQuestion + " " + firstStatement + '<br>' + '</b></p>'

        if (code.length <= 1) {
            emailBody += ""

        } else {
            emailBody += '<pre style="color:#000000;background-color:#eeeff5;border-radius:10px;box-shadow:1px 2px 4px rgba(0, 0, 0, 0.5);width:700px;"><p style="margin-left: 10em;">' + replace(code) + '</p></pre>'
        }
        emailBody += '<p>' + question + '</p>'

        for (let j = 0; j < answers.length; j++) {
            emailBody += answerCorrect(answers[j], value, correctAnswer, answers)
        }
        correctAnswer === value ? candidateRightAnswers++ : candidateWrongAnswers++
        totalQuestions += 1
        contQuestion += 1
    });

    let basic = 0;
    let medium = 0;
    let hard = 0;
    let bigger = ""

    console.log("saiu do for")
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

    let percentual = calculateHitPercentage(totalQuestions, candidateRightAnswers)

    emailBody2 += '<p style="font-size: 18px;"><b>Tipo de prova:</b>' + technology + '</p>'
    emailBody2 += '<p style="font-size: 18px;"><b> Complexidade:</b> ' + bigger + '</p>'
    emailBody2 += '<p style="font-size: 18px;"><b/>Total de respostas certas:</b> ' + candidateRightAnswers + '</p>'
    emailBody2 += '<p style="font-size: 18px;"><b>Total de respostas erradas:</b> ' + candidateWrongAnswers + '</p>'
    emailBody2 += '<p style="font-size: 18px;"><b>Porcentagem de acertos:</b> '
        + percentual + ' %</p><p style="border-top:solid #3770ad;"></p>'

    console.log("Verificando percentual " + percentual)
    emailBody2 += emailBody
    let response = await saveResult(candidateName, percentual, code)
    console.log(response.data)

    try {
        conversion({ html: emailBody2 }, function (err, pdf) {
            console.log(1);
            let output = fs.createWriteStream('./Anexos/' + candidateName + '.pdf')
            pdf.stream.pipe(output);
            transformEmail(candidateName)
        });
    }
    catch (error) {
        console.log(error)
    }



}


const saveResult = async (nomeCandidato, pencentualAcerto, code) => {
    let options2 = {
        headers: {
            'Content-Type': 'application/json',
        }
    }
    let res = await client.getPromise('http://bralpsvvwas02:8083/composicao-prova/codigoProva/' + code, options2).then((response) => (response))
    let date = new Date()
    let data = { "nomeTeste": res.data[0].nomeTeste, "dataHora": date, "nomeCandidato": nomeCandidato, "pencentualAcerto": pencentualAcerto }
    let options = {
        data: data,
        headers: {
            'Content-Type': 'application/json',
        }
    };

    return client.postPromise('http://bralpsvvwas02:8083/resultado-teste/', options).then((response) => (response))
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