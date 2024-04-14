const { query, body, param } = require('express-validator');
const { validation} = require('./index')

const listConditions = [
  query('bookId').optional(),
  query('customerEmail').optional().isEmail()
]

const getConditions = [
  param('id').notEmpty().withMessage('Ne peux pas être vide')
]

const createConditions = [
  body('bookId').notEmpty().withMessage('Ne peux pas être vide')
    .isInt().withMessage('Doit être un nombre'),
  body('customerEmail').notEmpty().withMessage('Ne peux pas être vide').trim()
]

const updateConditions = [
  body('bookId').notEmpty().withMessage('Ne peux pas être vide')
    .isInt().withMessage('Doit être un nombre')
]


const list = validation(listConditions)
const get = validation(getConditions)
const create = validation(createConditions)
const update = validation(getConditions, updateConditions)
const del = validation(getConditions)


module.exports = {
  list,
  get,
  create,
  update,
  del
};
