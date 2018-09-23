const express = require('express')
const rp = require('request-promise')
const cheerio = require('cheerio')
const Job = require('./model/Job')
const mongoose = require('./config/db')

const options = {
  uri: 'https://id.jobplanet.com/search?category=&query=&_rs_con=welcome&_rs_act=index&_rs_element=main_search_bar',
  transform: function (body) {
    return cheerio.load(body)
  }
}

const app = express()

app.get('/scrapes', (req, res) => {
  rp(options)
    .then(($) => {
      $('.result_unit_con').each((i, elem) => {
        Job.create({
          nameJob: $(elem).find('.posting_name').text(),
          companyName: $(elem).find('.btn_open').text(),
          logo: $(elem).find('.llogo > a > img').attr('src'),
          jobLocation: $(elem).find('.tags').eq(0).text(),
          jobFunction: $(elem).find('.tags').eq(1).text(),
          jobIndustry: $(elem).find('.tags').eq(2).text()
        })
          .then(
            () => {
              Job.find()
                .then(
                  jobs => {
                    return res.status(200).send({
                      error: false,
                      jobs: jobs
                    })
                  }
                )
                .catch(() => {
                  return res.status(200).send({
                    error: true,
                    message: 'Error'
                  })
                })
            }
          )
          .catch(
            err => {
              res.status(200).send({
                error: true,
                message: err
              })
            })
      })
    })
    .catch(
      err => {
        res.status(200).send({
          error: true,
          message: err
        })
      })
})

app.delete('/jobs/:id', (req, res) => {
  const id = req.params.id

  Job.findOneAndDelete({ _id: id })
    .then(
      () => {
        res.send({
          error: false,
          message: 'Data has been deleted successfuly.'
        })
      }
    )
    .catch(
      err => {
        res.send({
          error: true,
          message: err
        })
      }
    )
})

app.listen('8081', () => { 'Express server listening port 8081' })
