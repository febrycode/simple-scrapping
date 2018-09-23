const express = require('express')
const rp = require('request-promise')
const cheerio = require('cheerio')

const options = {
  uri: 'https://id.jobplanet.com/search?category=&query=&_rs_con=welcome&_rs_act=index&_rs_element=main_search_bar',
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
        listResult.push({
          nameJob: $(elem).find('.posting_name').text(),
          companyName: $(elem).find('.btn_open').text(),
          logo: $(elem).find('.llogo > a > img').attr('src'),
          jobLocation: $(elem).find('.tags').eq(0).text(),
          jobFunction: $(elem).find('.tags').eq(1).text(),
          jobIndustry: $(elem).find('.tags').eq(2).text()
        })
      })

      res.send({
        data: listResult
      })
    })
    .catch((err) => {
      console.log(err)
    })
})

app.listen('8081', () => { 'Express server listening port 8081' })
