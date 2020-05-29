const { post } = require('../../../services/request');

const url = "http://bralpsvvwas02:8083/"


const postTechnology = (req, res) => {
    const request = req.app.get('hystrix').hystrixRequestHandler(post, 'tecnologia');

    return request.execute(
        url+"tecnologia/add",
        req,
        res
    )
    // return client.getPromise('http://bralpsvvwas02:8083/tecnologia/', options).then((response) => (response));
}

const handler = async (req, res, next) => {
    try {

        result = await postTechnology(req, res)

        return res.status(result.response.statusCode).json(result.data);

    } catch (error) {
        return next(error, req, res);
    }
};

module.exports = {
    handler: handler
}