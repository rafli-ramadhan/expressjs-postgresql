const User = require("../../../model/account").User;
const createError = require('http-errors')
const { registerSchema, loginSchema } = require('../../../pkg/validation')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { signAccessToken, verifyAccessToken } = require('../../../pkg/jwt')

module.exports = {
  Login: async (req, res, next) => {
    try {
      // validation
      const body = await loginSchema.validateAsync(req.body)
      // if email not exist
      const user = await User.findOne({
        where: {
          email: req.body.email
        }
      })
      if (!user) throw createError.NotFound('User not registered')
      // comparing passwords asynchronously
      // const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
      const isMatch = await bcrypt.compare(body.password, user.password);
      if (!isMatch)
        throw createError.Unauthorized('Email/password not valid')

      const accessToken = await signAccessToken(user.id)

      res.status(200).send({ 
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token: accessToken,
      })
    } catch (error) {
      if (error.isJoi === true)
        return next(createError.BadRequest('Invalid email/password'))
      next(error)
    }
  },

  UserAuthorization: async (req, res, next) => {
    if (!req.headers['authorization']) return next(createError.Unauthorized())
    const authHeader = req.headers['authorization']
    const bearerToken = authHeader.split(' ')
    const token = bearerToken[1]
    // decoded JWT Token
    // const decodedResult = jwt.verify(token, process.env.JWT_SECRET);
    const decodedResult = await verifyAccessToken(token)

    try {
      const user = await User.TakeByID(decodedResult.id)
      return res.status(200).send({
          message: 'congratulations! but there is a hidden content', name: user.name,
      });
    } catch (error) {
      return res.status(401).send({message: 'invalid jwt token'});
    }
  },
}