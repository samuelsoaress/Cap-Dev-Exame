const { get } = require('../../../services/request');

const url = 'http://bralpsvvwas02:8083/'

const getExamName = (code,req, res) => {
  const request = req.app.get('hystrix').hystrixRequestHandler(get, 'Exam Name');
  return request.execute(
      url + 'composicao-prova/codigoProva/'+code,
      req,
      res,
  )
}

const handler = async (req, res, next) => {

  try {
      if (!req.query.code) {
          return res.send({
              error: 'Voce precisa fornecer um codigo de exame.'
          })
      }

      let examName = await getExamName(req.query.code, req, res)
      console.log(examName.data)
      return res.send(examName.data)

  } catch (error) {
      return next(error, req, res);
  }
};

module.exports = {
  handler: handler
}