const db = require('../database');
const utils = require('../utils')

async function getList(params) {
  const { bookId, customerEmail } = params
  const query = db.from('borrow').select('*');

  if(bookId) {
    query.where({ bookId })
  }

  if(customerEmail) {
    query.where({ customerEmail })
  }

  return query
}

async function create(params) {
  const { bookId } = params
  const insert = await db('borrow').insert(params);
  return db('book').where({ id: bookId }).update({borrowId: insert[0]});
}

async function update({id, bookId}) {
  const update = await db('borrow').where({ id, bookId }).update({endDate: new Date()});
  if (update === 0) {
    throw new Error()
  }
  return db('book').where({ id: bookId }).update({borrowId: null});
}

module.exports = {
  getList,
  create,
  update
};