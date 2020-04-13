const fs = require('fs')
const path = require('path')

const getExams = () => {
    let exams = loadExamsFromfile()
    return exams
}

const loadExamsFromfile = () => {
    const dataPath = path.join(__dirname, '../data/exams.json')
    return JSON.parse(fs.readFileSync(dataPath))
}

module.exports = {
    getExams: getExams,
}
