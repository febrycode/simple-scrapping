const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./routes')

const app = express()

app.use(bodyParser.json())

routes.init(app)

app.listen('8081', () => { 'Express server listening port 8081' })

module.exports = app
