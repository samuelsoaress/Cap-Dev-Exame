const fs = require('fs')
const path = require('path')
const questions = require('./questions')
const _ = require('lodash');
const md5 = require('md5')

const dataPath = path.join(__dirname, '../data/exams.json')

const getNewExam = (dataForNewExam) => {

    const exams = loadExamsFromfile()
    const examCode = 'Exam' + (exams.length + 1)

    let newExam = {
        code: md5(examCode),
        questionsConfig: []
    }

    _.forOwn(dataForNewExam, (value, key) => {
        let questionConfig = {
            technology: value[1],
            numberOfQuestions: value[0],
            complexity: value[2]
        }

        newExam.questionsConfig.push(questionConfig)
    })

    exams.push(newExam)
    saveExams(exams)
}

const getExam = (examCode) => {

    const exam = getExamByCode(examCode)
    const allQuestions = questions.getAllQuestions()

    let examQuestions = []

    for (let i = 0; i < exam.questionsConfig.length; i++) {

        let technology = exam.questionsConfig[i].technology
        let numberOfQuestions = exam.questionsConfig[i].numberOfQuestions
        let complexity = exam.questionsConfig[i].complexity

        let counter = 0
        for (let j = 0; j < allQuestions.length; j++) {
            let question = allQuestions[j]
            if (technology === question.technology && complexity === question.complexity) {
                examQuestions.push(question);
                counter++
                if (counter === numberOfQuestions) {
                    break;
                }
            }
        }

    }

    return examQuestions
}

const getExamByCode = (examCode) => {
    const exams = loadExamsFromfile()
    return exams.find((exam) => exam.code === examCode)
}

const loadExamsFromfile = () => {
    return JSON.parse(fs.readFileSync(dataPath))
}

const saveExams = (exams) => {
    const dataJSON = JSON.stringify(exams)
    fs.writeFileSync(dataPath, dataJSON)
}

module.exports = {
    getExam: getExam,
    getNewExam: getNewExam
}
