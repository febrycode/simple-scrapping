const mongoose = require('mongoose')
const mongoUrl = require('../global')

mongoose.Promise = global.Promise

mongoose.connect(mongoUrl.url, { useNewUrlParser: true })
  .then(
    () => {
      console.log('Successfully connected to the database')
    }
  )
  .catch(
    () => {
      console.log('Could not connect to the database. Exiting now...')
      process.exit()
    }
  )

module.exports = mongoose
