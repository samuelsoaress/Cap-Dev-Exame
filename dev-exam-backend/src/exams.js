const fs = require('fs')
const path = require('path')
const questions = require('./questions')
const _ = require('lodash');
const md5 = require('md5')
const { Client } = require('node-rest-client-promise');
const client = new Client();

const dataPath = path.join(__dirname, '../data/exams.json')

const getNewExam = async (dataForNewExam) => {


    let date = new Date().getTime()
    const examCode = 'Exam' + date
    let code = md5(examCode)

    let cont = 0
    _.forOwn(dataForNewExam, async (value, key) => {
        let newExam = {
            "codigoProva": code,
            "complexidade": value[2],
            "nomeTeste": dataForNewExam.nomeTeste,
            "quantidadeQuestoes": value[0],
            "sequencialProva": cont++,
            "tecnologia": value[1]
        }
        let options = {
            data: newExam,
            headers: {
                'Content-Type': 'application/json',
            }
        };
        let response = await client.postPromise('http://bralpsvvwas02:8083/composicao-prova/', options).then((response) => (response))
        console.log(response.data.status)
    });
}

const getExam = async (code) => {
    let options = {
        headers: {
            'Content-Type': 'application/json',
        }
    };
    let res = await client.getPromise('http://bralpsvvwas02:8083/composicao-prova/codigoProva/' + code, options).then((response) => (response))

    const exam = res.data

    const allQuestions = questions.getAllQuestions()

    let examQuestions = []

    for (let i = 0; i < exam.length; i++) {
        let randomQuestions = []
        let technology = exam[i].tecnologia
        let numberOfQuestions = exam[i].quantidadeQuestoes
        let complexity = exam[i].complexidade



        while (randomQuestions.length < numberOfQuestions) {
            let randomNumber = Math.floor(Math.random() * allQuestions.length);;
            let randomQuestion = allQuestions[randomNumber]
            let found = randomQuestions.find((q) => q.code === randomQuestion.code)
            if (found === undefined) {

                if (technology.toUpperCase() === randomQuestion.technology.toUpperCase() && complexity.toUpperCase() === randomQuestion.complexity.toUpperCase()) {
                    randomQuestions.push(randomQuestion);
                    examQuestions.push(randomQuestion);

                }
            }

        }

    }
    return examQuestions
}


const loadExamsFromfile = () => {
    return JSON.parse(fs.readFileSync(dataPath))
}

module.exports = {
    getExam: getExam,
    getNewExam: getNewExam
}
