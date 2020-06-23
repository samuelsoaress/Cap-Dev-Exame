const isLoggedIn = (req, res, next) => {
  console.log('session ', req.session);
  if(req.isAuthenticated()){
      //console.log('user ', req.session.passport.user)
      return next()
  }
  return res.statusCode(400).json({"statusCode" : 400, "message" : "not authenticated"})
}

const handler = (req, res, next) => {
  try {
      
      isLoggedIn(req, res, next)
      res.json("Data is")

  } catch (error) {
      return next(error, req, res);
  }
};

module.exports = {
  handler: handler
}