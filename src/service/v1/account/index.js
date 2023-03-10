const Account = require('../../../models/account')

module.exports = {
    // SELECT * FROM "accounts" WHERE "id" IN (..., ...., etc)
    FindByIDs : async (accountIDs) => {
        await Account.findAll({
            where: {
              id: accountIDs
            }
          })
        .then(data => {
            return data
        })
        .catch((error) => {
            return error
        });
    },
    // SELECT * FROM "accounts" WHERE "id" IN (...)
    TakeByID : async (accountID) => {
        await Account.findAll({
            where: {
              id: accountID
            }
          })
        .then(data => {
            return data
        })
        .catch((error) => {
            return error
        });
    },
    // SELECT * FROM "accounts" WHERE "username" = '...'
    TakeByUsername : async (accountID) => {
        await Account.findAll({
            where: {
              id: accountID
            }
        })
        .then(data => {
            return data
        })
        .catch((error) => {
            return error
        });
    },
    Create : async (entity) => {
        await Account.create(entity)
        .then(data => {
            return data
        })
        .catch((error) => {
            return error
        });
    },
    Update : (accountID, entity) => {
        Account.update(
            entity,
            {
              where: {
                id: accountID
              }
            }
          )
        .then(data => {
            return data
        })
        .catch((error) => {
            return error
        });
    },
    Delete : (accountID) => {
        Account.destroy({
            where: {
              id: accountID
            }
          })
        .then(data => {
            return data
        })
        .catch((error) => {
            return error
        });
    },
};