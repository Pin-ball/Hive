const path = require('path'),
  express = require('express'),
  createError = require('http-errors'),
  logger = require('morgan'),
  setRoutes = require('./routes'),
  swaggerJsdoc = require('swagger-jsdoc'),
  cors = require('cors'),
  swaggerUi = require('swagger-ui-express'),
  config = require('./config');


const app = express();

app.use(cors())
app.use(express.json());
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const specs = swaggerJsdoc(config.swagger);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);

setRoutes(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
