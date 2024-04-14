var express = require('express');
var router = express.Router();
const borrowValidator = require('../validators/borrow');
const borrowController = require('../controllers/borrow');


router.get('/list', borrowValidator.list, borrowController.list);

router.post('/', borrowValidator.create, borrowController.create);

router.put('/:id', borrowValidator.update, borrowController.update);


module.exports = router;
