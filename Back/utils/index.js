function getDate(date = null) {
  let currentDate = date ? new Date(date) : new Date()

  return currentDate.toISOString()
    .replace('T', ' ')
    .replace('Z', '')
}

module.exports = {
  getDate
};