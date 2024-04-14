const express = require('express');
const router = express.Router();
const bookValidator = require('../validators/book');
const bookController = require('../controllers/book');

router.get('/list', bookValidator.list, bookController.list);

router.get('/:id(\\d+)', bookValidator.get, bookController.get);

router.post('/', bookValidator.create, bookController.create);

router.put('/:id', bookValidator.update, bookController.update);

router.delete('/:id', bookValidator.del, bookController.del);

router.get('/autocomplete', bookValidator.autoComplete, bookController.autoComplete);


module.exports = router;
