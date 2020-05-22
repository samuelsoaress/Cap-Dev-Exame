const { post } = require('../../../services/request');

const url = "http://bralpsvvwas02:8083/"

const getNewExam = async (dataForNewExam,req,res) => {


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

        // let response = await client.postPromise('http://bralpsvvwas02:8083/composicao-prova/', options).then((response) => (response))
        const request = req.app.get('hystrix').hystrixRequestHandler(post, 'new Exame');
        return request.execute(
            url+'composicao-prova/',
            req,
            res,
        )        
    });
}


const handler = async (req, res, next) => {
    try {

        let requestData = req.body

        await exams.getNewExam(requestData, req, res)

        return res.status(200).json({ "statusCode": 200, "message": "email sent" })

    } catch (error) {
        return next(error, req, res);
    }
};

module.exports = {
    handler: handler
}