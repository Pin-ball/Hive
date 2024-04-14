const db = require('../database');
const utils = require('../utils')

async function getList(params) {
  const { ids } = params

  const query = db.from('author').select('*');

  if(ids) {
    query.whereIn('id', ids.split(','))
  }
  return query;
}

async function getItem ({id}) {
  return db('author').select('*').where({ id }).first();
}

async function createItem (params) {
  return db('author').insert(params);
}

async function updateItem ({id, ...params}) {
  const body = {
    ...params,
    modificationDate: utils.getDate()
  }
  return db('author').where({ id }).update(body);
}

async function deleteItem ({id}) {
  return db('author').where({ id }).del();
}

async function autocomplete ({q}) {
  return db('author').select(['id', 'name']).where('name', 'like', `%${q}%`);
}

module.exports = {
  getList,
  getItem,
  createItem,
  updateItem,
  deleteItem,
  autocomplete
};