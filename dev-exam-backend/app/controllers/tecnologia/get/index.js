const { get } = require('../../../services/request');

const url = "http://bralpsvvwas02:8083/"




const getTechnology = (req, res) => {
    const request = req.app.get('hystrix').hystrixRequestHandler(post, 'tecnologia');

    return request.execute(
        url+"tecnologia/",
        req,
        res
    )
    // return client.getPromise('http://bralpsvvwas02:8083/tecnologia/', options).then((response) => (response));
}

const handler = async (req, res, next) => {
    try {

        result = await getTechnology(req, res)

        return res.status(result.response.statusCode).json(result.data);

    } catch (error) {
        return next(error, req, res);
    }
};

module.exports = {
    handler: handler
}