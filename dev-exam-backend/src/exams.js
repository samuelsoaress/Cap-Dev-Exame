const fs = require('fs')
const path = require('path')
const questions = require('./questions')

const getExam = (examCode) => {

    const exam = getExamByCode(examCode)
    const allQuestions = questions.getAllQuestions()

    let examQuestions = []
    
    for(let i=0; i < exam.questionsConfig.length; i++){

        let technology = exam.questionsConfig[i].technology
        let numberOfQuestions = exam.questionsConfig[i].numberOfQuestions
        let complexity = exam.questionsConfig[i].complexity
        
        let counter = 0

        for(let j=0; j < allQuestions.length; j++){
            let question = allQuestions[j]
            if(technology === question.technology && complexity === question.complexity){
                examQuestions.push(question)
                counter = counter + 1
                if(counter === numberOfQuestions){
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
    const dataPath = path.join(__dirname, '../data/exams.json')
    return JSON.parse(fs.readFileSync(dataPath))
}

module.exports = {
    getExam: getExam,
}
