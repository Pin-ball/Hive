const { query, body, param } = require('express-validator');
const { validation} = require('./index')

const listConditions = [
  query('ids').optional()
]

const getConditions = [
  param('id').notEmpty().withMessage('Ne peux pas être vide')
]

const createConditions = [
  body(['name', 'biography', 'country'])
    .notEmpty().withMessage('Ne peux pas être vide')
    .isString().withMessage('Doit être une chaine de caractères')
]

const autoCompleteConditions = [
  query('q').notEmpty().withMessage('Ne peux pas être vide').trim()
]

const list = validation(listConditions)
const get = validation(getConditions)
const create = validation(createConditions)
const update = validation(getConditions, createConditions)
const del = validation(getConditions)
const autoComplete = validation(autoCompleteConditions)

module.exports = {
  list,
  get,
  create,
  update,
  del,
  autoComplete
};
