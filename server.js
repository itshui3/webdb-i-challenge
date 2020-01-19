//dependencies
const express = require('express');
const db = require('./data/dbConfig.js');
//build
const server = express();
//config
server.use(express.json());
//routers
const apiRouter = express.Router();
const accountsRouter = require('./accounts/accounts-router');
apiRouter.use('/accounts', accountsRouter);
server.use('/api', apiRouter);

// 404 catch all
server.use((req, res) => {
  res.status(404).json({ message: `404 resource not found on server `})
})
module.exports = server;