const express = require('express')
const rp = require('request-promise')
const cheerio = require('cheerio')

const options = {
  uri: "https://id.jobplanet.com/search?category=&query=&_rs_con=welcome&_rs_act=index&_rs_element=main_search_bar",
  transform: function (body) {
    return cheerio.load(body)
  }
}

const app = express()

app.get('/scrape', (req, res) => {
  rp(options)
    .then(($) => {
      const listName = {}
      $('.posting_name').each((i, elem) => {
        listName[i] = $(elem).text()
      })

      const listCompanyName = {}
      $('.btn_open').each((i, elem) => {
        listCompanyName[i] = $(elem).text()
      })

      const listLogo = {}
      $('.llogo>a').children().each((i, elem) => {
        listLogo[i] = $(elem).attr('src')
      })

      const listLocation = {}
      $('.result_labels').each((i, elem) => {
        listLocation[i] = $(elem).children('.tags').first().text()
      })

      const sumList = {
        name: listName,
        company: listCompanyName,
        logo: listLogo,
        location: listLocation
      }

      res.send({
        data: sumList
      })
    })
    .catch((err) => {
      console.log(err);
    })

})

app.listen('8081', () => { 'Express server listening port 8081' })