const { get } = require('../../../services/request');
const fs = require('fs')
const path = require('path')
const _ = require('lodash');

const url = 'http://bralpsvvwas02:8083/'

const removeCorrectAnswer = (questions) => {
    return questions.map((question) => _.omit(question, ['correctAnswer']))
}

const getAllQuestions = () => {
    let questions = loadQuestionsFromfile()
    return questions = removeCorrectAnswer(questions)
}

const loadQuestionsFromfile = () => {
    const dataPath = path.join(__dirname, '../../../data/questions.json')
    return JSON.parse(fs.readFileSync(dataPath))
}

const getExam = async (code,req,res) => {
    console.log("entrou na getExam")

    // let res = await client.getPromise('http://bralpsvvwas02:8083/composicao-prova/codigoProva/' + code, options).then((response) => (response))
    const request = req.app.get('hystrix').hystrixRequestHandler(get, 'codigo prova');
    let response = await request.execute(
        url+'composicao-prova/codigoProva/'+code,
        req,
        res,
    )
    console.log(response.data)
    const exam = response.data

    const allQuestions = getAllQuestions()

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


const handler = async (req, res, next) => {
    
    try {
        if (!req.query.code) {
            return res.send({
                error: 'Voce precisa fornecer um codigo de exame.'
            })
        }
    
        let exam = await getExam(req.query.code,req,res)
        return res.send(exam)

    } catch (error) {
        return next(error, req, res);
    }
};

module.exports ={
    handler:handler
}