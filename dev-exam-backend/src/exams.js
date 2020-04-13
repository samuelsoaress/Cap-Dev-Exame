const fs = require('fs')
const path = require('path')

const getExams = () => {
    let exams = loadExamsFromfile()
    return exams
}
 
const getExamRight = (codeExam) => {
    let questions = []
    const exams = path.join(__dirname, '../data/exams.json')
    const questions = path.join(__dirname, '../data/questions.json')
    for(var i=0; i<exams[codeExam-1]["questoes"].length; i++){

        var tecnologia = exams[codeExam-1]["questoes"][i]["tecnologia"]
        var qtd_perguntas = exams[codeExam-1]["questoes"][i]["qtd_perguntas"]
        var complexidade = exams[codeExam-1]["questoes"][i]["complexidade"]

        for(var j=0; j<questions.length; j++){
            
            //Falta terminar a logica de percorrer os questions.json
        }
    }
    return JSON.parse(fs.readFileSync(dataPath))
}

const loadExamsFromfile = () => {
    const dataPath = path.join(__dirname, '../data/exams.json')
    return JSON.parse(fs.readFileSync(dataPath))
}

module.exports = {
    getExams: getExams,
}
