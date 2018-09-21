const express = require('express')
const request = require('request')
const cheerio = require('cheerio')

const app = express()

app.get('/scrape', (req, res) => {
  res.status(200).send({
    message: 'hello world'
  })
})

app.listen('8081', () => { 'Express server listening port 8081' })