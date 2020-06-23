const { get } = require('../../../services/request');

const url = "http://bralpsvvwas02:8083/"

const getAllExams = async (req, res) => {

    const request = req.app.get('hystrix').hystrixRequestHandler(get, 'new Exame');
    return request.execute(
        url + 'composicao-prova/',
        req,
        res,
    )
}

const handler = async (req, res, next) => {
    try {
        let question = await getAllExams(req, res)
        return res.status(200).json(question.data)
    } catch (error) {
        return next(error, req, res);
    }
};
module.exports = {
    handler: handler
}