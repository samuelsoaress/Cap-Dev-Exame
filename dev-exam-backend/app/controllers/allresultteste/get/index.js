const { get } = require('../../../services/getteste');

const url = "http://bralpsvvwas02:8083/"

const getAllExams = async (req, res) => {

    const request = req.app.get('hystrix').hystrixRequestHandler(get, 'Get result teste');
    return request.execute(
        url + 'resultado-teste/',
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