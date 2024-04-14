const { query, body, param } = require('express-validator');
const { validation } = require('./index')

const listConditions = [
  query(['ids', 'authorIds']).optional(),
  query(['borrow', 'available']).optional().isBoolean(),
  query('page').optional().trim()
]

const getConditions = [
  param('id').notEmpty().withMessage('Ne peux pas être vide'),

]

const createConditions = [
  body(['title', 'editor', 'genre', 'resume', 'language'])
    .notEmpty().withMessage('Ne peux pas être vide')
    .isString().withMessage('Doit être une chaine de caractères'),
  body('authorId').isInt().withMessage('Author Id invalide'),
  body('ISBN').isISBN().withMessage('ISBN invalide'),
  body('publicationDate').isDate().withMessage('Date invalide'),
  body('pages').isInt().withMessage('Doit être un nombre')
]

const autocompleteConditions = [
  query('q').notEmpty().withMessage('Ne peux pas être vide').trim()
]


const list = validation(listConditions)
const get = validation(getConditions)
const create = validation(createConditions)
const update = validation(getConditions, createConditions)
const del = validation(getConditions)
const autoComplete = validation(autocompleteConditions)


module.exports = {
  list,
  get,
  create,
  update,
  del,
  autoComplete
};
