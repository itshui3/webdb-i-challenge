const accountsDb = require('../accounts/accountsDb');

const validateAccountId = (req, res, next) => {
  const id = req.params.id;
  accountsDb.getById(id)
    .then( resou => {
      if(resou[0]) {
        console.log(resou);
        next();
      } else {
        res.status(404).json({ message: `status 404: resource not found` })
      }
    })
    .catch( err => {
      res.status(500).json({ message: `status 500: internal server error, could not retrieve account`})
    })
}

const validateNewAccount = (req, res, next) => {
  const newAccount = req.body;
  if (!newAccount.name || !newAccount.budget) {
    res.status(400).json({ message: `status 400: could not recognize payload` })
  } else {
    next();
  }
}

const validation = {
  validateAccountId,
  validateNewAccount
}

module.exports = validation;