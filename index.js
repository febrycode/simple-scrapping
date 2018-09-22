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
      const listResult = []

      $('.result_unit_con').each((i, elem) => {
        console.log($(elem).find('.llogo > a > img').attr('src'))
        listResult.push({
          nameJob: $(elem).find('.posting_name').text(),
          companyName: $(elem).find('.btn_open').text(),
          logo: $(elem).find('.llogo > a > img').attr('src')
        })
      })

      // const listLocation = {}
      // $('.result_labels').each((i, elem) => {
      //   listLocation[i] = $(elem).children('.tags').first().text()
      // })

      // const sumList = {
      //   name: listName,
      //   company: listCompanyName,
      //   logo: listLogo,
      //   location: listLocation
      // }

      res.send({
        data: listResult
      })
    })
    .catch((err) => {
      console.log(err);
    })

})

app.listen('8081', () => { 'Express server listening port 8081' })