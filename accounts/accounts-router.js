const router = require('express').Router();
const accountsDb = require('./accounts-model');

router.get('/', (req, res) => {
  accountsDb.selectAll(req.query)
    .then( resou => {

      let sortedAccounts;

      if(req.query.sortby) {
        const sortByArr = req.query.sortby.split(':');

        if(sortByArr[1] = 'asc') {
          sortedAccounts = resou.sort((a, b) => {
            return a[sortByArr[0]] > b[sortByArr[0]];
          })
        } else if(sortByArr[1]='desc') {
          sortedAccounts = resou.sort((a, b) => {
            return a[sortByArr[0]] < b[sortByArr[0]];
          })
        } 
      } else {
        sortedAccounts = resou;
      }


      res.status(200).json({ message: `status 200: successfully retrieved records`, resource: sortedAccounts })
    })
    .catch( err => {
      res.status(500).json({ message: `status 500: internal server error, could not retrieve records` })
    })
})

router.get('/:id', (req, res) => {
  const id = req.params.id;
  accountsDb.selectById(id)
    .then( resou => {
      if(resou[0]) {
        res.status(200).json({ message: `status 200: successfully retrieved record`, resource: resou })
      } else {
        res.status(404).json({ message: `status 404: resource not found` })
      }

    })
    .catch( err => {
      res.status(500).json({ message: `status 500: internal server error, could not retrieve record` })
    })
})

router.post('/', (req, res) => {
  const newAccount = req.body;
  accountsDb.insert(newAccount)
    .then( newAccount => {
      console.log(newAccount, `newAcc`);
      res.status(200).json({ message: `status 200: successfully added record`, resource: newAccount });    
    })
    .catch( err => {
      console.log(err);
      res.status(500).json({ message: `status 500: internal server error, could not add record` })
    })
})

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  accountsDb.del(id)
    .then( quantity => {
      res.status(204).json({ message: `status 204: successfully deleted resource`, resource: quantity })
    })
    .catch( err => {
      console.log(err);
      res.status(500).json({ message: `status 500: internal server error, could not delete resource` })
    })
})

router.put('/:id', (req, res) => {
  const id = req.params.id;
  const changes = req.body;
  accountsDb.update(id, changes)
    .then( updatedAccount => {
      console.log(updatedAccount, `updatedacc`);
      res.status(200).json({ message: `status 200, successfully updated resource`, resource: updatedAccount })
    })
    .catch( err => {
      console.log(err);
      res.status(500).json({ message: `status 500: internal server error, could not update resource` })
    })
})

module.exports = router;