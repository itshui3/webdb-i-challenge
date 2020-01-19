//dependencies
const express = require('express');
const accountsDb = require('./accountsDb');
//middleware
const validation = require('../middleware/accounts-validation');
//build
const router = express.Router();

//routes
//get all accounts
router.get('/', (req, res) => {
  accountsDb.get()
    .then( resou => {
      console.log(resou);
      res.status(200).json({ message: `status 200: successfully retrieved account records`, resource: resou })
    })
    .catch( err => {
      res.status(500).json({ message: `status 500: internal server error, could not retrieve account records` })
    })
})
//get account by id
router.get('/:id', validation.validateAccountId, (req, res) => {
  // 4:50pm 1.18.20 - requires validation of id
  // 5:10pm 1.18.20 - validation middleware built
  const id = req.params.id;
  accountsDb.getById(id)
    .then( resou => {
      console.log(resou);
      res.status(200).json({ message: `status 200: successfully retrieved account record`, resource: resou })
    })
    .catch( err => {
      res.status(500).json({ message: `status 500: internal server error, could not retrieve account record`})
    })
})
//post account
router.post('/', validation.validateNewAccount, (req, res) => {
  // 4:50pm 1.18.20 - requires validation of req.body required props
  accountsDb.insert(req.body)
    .then( resou => {
      res.status(200).json({ message: `status 200: successfully added account`, resource: resou })
    })
    .catch( err => {
      console.log(err);
      res.status(500).json({ message: `status 500: internal server error, could not add account`})
    })
})
//update account
const accounts__put__mw = [validation.validateAccountId, validation.validateNewAccount];
router.put('/:id', ...accounts__put__mw, (req, res) => {
  const id = req.params.id;
  const newAccount = req.body;
  accountsDb.update(id, newAccount)
    .then( resou => {
      res.status(204);
    })
    .catch( err => {
      console.log(err);
      res.status(500).json({ message: `status 500: internal server error, could not update account`})
    })
})
//remove account
router.delete('/:id', validation.validateAccountId, (req, res) => {
  const id = req.params.id;
  accountsDb.remove(id)
    .then( resou => {
      res.status(204)
    })
    .catch( err => {
      res.status(500).json({ message: `status 500: internal server error, could not remove account`})
    })
})
//export
module.exports = router;