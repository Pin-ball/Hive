const bookRouter = require("./book");
const authorRouter = require("./author");
const borrowRouter = require("./borrow");

function setRoutes(app) {

  app.use('/book', bookRouter);
  app.use('/author', authorRouter);
  app.use('/borrow', borrowRouter);

  app.use('/', async (req, res, next) => {
    res.status(200).json('OK')
  });
}


module.exports = setRoutes;
