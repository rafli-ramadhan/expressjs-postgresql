const { TakeByUsername, Register } = require("../../../model/account")
const registerSchema = require("../../../pkg/validation.js")

module.exports = {
  GetByIDs: async (req, res) => {
    var accountIDs = [req.params.id]
    try {
      const users = await Account.FindByIDs(accountIDs)
      return res.status(200).send({
        data: users,
      })
    }
    catch (error) {
      return res.status(500).send({
        error: error.message,
        message: 'Some error ocurred while retrieving data.',
      });
    }
  },
  GetByID: async (req, res) => {
    try {
      const account = await Account.TakeByID(req.params.id)
      if (!account) throw createError.NotFound('Account not found')
      return res.status(200).send(account);
    }
    catch (error) {
      if(err.kind === 'ObjectId') {
        return res.status(404).send({
          error: error.message,
          message: 'Data not found with id ' + req.params.id,
        });
      }
      return res.status(500).send({ 
        error: error.message,
        message: 'Error retrieving data with id ' + req.params.id,
      });
    }
  },
  Register: async (req, res, next) => {
    try {
      const doesExist = await TakeByUsername(req.body.username)
      if (doesExist)
        throw createError.Conflict(`${body.username} is already been registered`)
      const account = new User(body)

      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(account.password, salt)
      account.password = hashedPassword

      Register(account).then(() => {
        return res.status(200).send({ 
          message: 'Created',
        })
      }).catch(error => {
        return res.status(500).send({ 
          error: err.message,
          message: 'Failed',
        })
      })
    } catch (error) {
      if (error.isJoi === true) error.status = 422
      next(error)
    }
  },
  Update: (req, res) => {
    Account.TakeByID(req.params.id)
    .then(currentData => {
      let {newName, newEmail, newPassword, newGender, newRole, newUpdatedScreeningResult} = '';
      if (!req.body.name) { newName = currentData.name}
      if (!req.body.email) { newEmail = currentData.email}
      if (!req.body.password) { newPassword = currentData.password}
      if (!req.body.gender) { newGender = currentData.gender}
      if (!req.body.role) { newRole = currentData.role}
      if (!req.body.updatedScreeningResult) { newUpdatedScreeningResult = currentData.updatedScreeningResult}
      if (req.body.name) { newName = req.body.name}
      if (req.body.email) { newEmail = req.body.email}
      if (req.body.password) { newPassword = req.body.password}
      if (req.body.gender) { newGender = req.body.gender}
      if (req.body.role) { newRole = req.body.role}
      if (req.body.updatedScreeningResult) { newUpdatedScreeningResult = req.body.updatedScreeningResult}

      const newData =
      {
        name: newName,
        email: newEmail,
        password: newPassword,
        gender: newGender,
        role: newRole,
        updatedScreeningResult: newUpdatedScreeningResult,
      }

      Account.Update(req.params.id, newData)
      .then(num => {
        if (num == 1) {
          return res.status(200).send({
            message: "Account was updated successfully."
          });
        } 
        else {
          return res.status(500).send({
            message: `Cannot update account data with id=${id}.`
          });
        }
      })
      .catch(error => {
        if (error.kind === "not_found") {
          return res.status(404).send({
            error: error.message,
            message: `Account with id ${req.params.userId} not found.`
          });
        } 
        else {
          return res.status(500).send({
            error: error.message,
            message: "Error updating Account with id " + req.params.userId
          });
        }
      });
    })
    .catch(error => {
      return res.status(500).send({
        error: error.message,
        message: "Error updating Account with id " + req.params.userId
      }); 
    });
  },
  Delete: (req, res) => {
    try {
      Account.Delete(req.param.id).then(() => {
        return res.status(200).send({ 
          message: 'Data deleted successfully!' 
        });
      })
    }
    catch (error) {
      if(error.kind === 'not found') {
        return res.status(404).send({ 
          error: error.message,
          message: 'Data not found with id ' + req.params.id, 
        });
      }
      return res.status(500).send({
        error: error.message,
        message: 'Could not delete data with id ' + req.params.id, 
      });
    };
  }
};
