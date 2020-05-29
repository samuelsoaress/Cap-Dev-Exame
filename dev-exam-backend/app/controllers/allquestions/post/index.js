const { post } = require('../../../services/request');

const url = "http://bralpsvvwas02:8083/"

const newQuestion = async (body, req, res) => {

    const request = req.app.get('hystrix').hystrixRequestHandler(post, 'new Exame');
    return request.execute(
        url + 'questao/',
        req,
        res,
        body,
    )

}


const handler = async (req, res, next) => {
    try {

        let requestData = req.body

        let question = await newQuestion(requestData, req, res)
        const { statusCode } = question.response;
        return res.status(statusCode).json({ "statusCode": statusCode, "message": "email sent" })

    } catch (error) {
        return next(error, req, res);
    }
};

module.exports = {
    handler: handler
}