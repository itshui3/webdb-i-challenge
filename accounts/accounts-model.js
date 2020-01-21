const db = require('../data/dbConfig');

module.exports = {
  selectAll,    // selectAll(query)
  selectById,   // selectById(id)
  insert,       // insert(account)
  del,          // del(id)
  update        // update(id, changes)
}

// helpers

function selectAll(query) {
  const limitArr = query.limiter.split(':');

  return db('accounts')
    .orderBy(limitArr[0], limitArr[1])
    .limit(Number(limitArr[2]))
}

function selectById(accountId) {
  return db('accounts')
    .where({ id: accountId });
}

function insert(account) {
  return db('accounts')
    .insert(account)
      .then( ids => {
        // 2:25 pm => check if ids is array/obj/integer
        // 4:18 pm => ids is an array with an integer
        return db('accounts').where({ id: ids[0] }).first();
        // resolves to an array with the first object within and .first() references that first object to be the resolve
      })
}

function del(accountId) {
  return db('accounts')
    .where({ id: accountId })
    .del()
    // 2:27 pm => check if .then resolves an id or an object with id
}

function update(accountId, changes) {
  return db('accounts')
    .where({ id: accountId })
    .update(changes)
}