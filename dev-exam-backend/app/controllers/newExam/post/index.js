const { post } = require('../../../services/post');

const url = "http://bralpsvvwas02:8083/"

var md5 = require('md5');

const _ = require('lodash');

const getNewExam = async (dataForNewExam,req,res) => {


    let date = new Date().getTime()
    const examCode = 'Exam' + date
    let code = md5(examCode)

    let cont = 1
    let examName = dataForNewExam.nomeTeste
    delete dataForNewExam.nomeTeste;
    _.forOwn(dataForNewExam, async (value, key) => {
        let newExam = {
            "codigoProva": code,
            "complexidade": value[2],
            "nomeTeste": examName,
            "quantidadeQuestoes": value[0],
            "sequencialProva": cont++,
            "tecnologia": value[1]
        }

        // let response = await client.postPromise('http://bralpsvvwas02:8083/composicao-prova/', options).then((response) => (response))
        const request = req.app.get('hystrix').hystrixRequestHandler(post, 'new Exame');
        return request.execute(
            url+'composicao-prova/',
            req,
            res,
            newExam
        )        
    });
}


const handler = async (req, res, next) => {
    try {

        let requestData = req.body

        let result = await getNewExam(requestData, req, res)

        return res.status(200).json({"success":"data safe"})

    } catch (error) {
        return next(error, req, res);
    }
};

module.exports = {
    handler: handler
}