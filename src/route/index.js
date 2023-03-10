const AuthController = require('../controller/v1/auth')
const UserController = require('../controller/v1/account')

module.exports = app => {
  const router = require("express").Router();

  router.get('/accounts', UserController.GetByIDs);
  router.post('/login', AuthController.Login);
  router.post('/accounts', UserController.Register);
  router.put('/accounts', UserController.Update);
  router.delete('/accounts', UserController.Delete);

  app.use('/v1', router)

  app.use(async (req, res, next) => {
    next(createError.NotFound())
  })
  
  app.use((err, req, res, next) => {
    if (err.isJoi === true) {
      return res.status(err.status || 500).send({
        message: "calidation error",
        error: err.message
      })
    }
    else {
      return res.status(err.status || 500).send({
        error: err.message
      })
    }
  })

};
