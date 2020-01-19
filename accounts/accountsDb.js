const db = require('../data/dbConfig');

module.exports = {
  get,      // get()
  getById,  // getById(accountId)
  insert,   // insert(post)
  update,   // update(accountId, changes)
  remove    // remove(accountId)
}

function get() {
  return db('accounts');
}

function getById(accountId) {
  return db('accounts').where({ id: accountId });
}

function insert(post) {
  return db('accounts').insert(post)
}

function update(accountId, changes) {
  return db('accounts').where({ id: accountId }).update(changes);
}

function remove(accountId) {
  return db('accounts').where({ id: accountId }).del();
}