const { validationResult } = require('express-validator')

const validation = (...conditions) => {
  return [
    conditions,
    error
  ]
}

const error = (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() })
    return
  }

  next()
}


module.exports = {
  validation
};
