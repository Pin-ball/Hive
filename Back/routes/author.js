const express = require('express');
const router = express.Router();
const authorValidator = require('../validators/author');
const authorController = require('../controllers/author');


router.get('/list', authorValidator.list, authorController.list);

router.get('/:id(\\d+)', authorValidator.get, authorController.get);

router.post('/', authorValidator.create, authorController.create);

router.put('/:id', authorValidator.update, authorController.update);

router.delete('/:id', authorValidator.del, authorController.del);

router.get('/autocomplete', authorValidator.autoComplete, authorController.autoComplete);


module.exports = router;
