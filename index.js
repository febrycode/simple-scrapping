const express = require('express')
const rp = require('request-promise')
const cheerio = require('cheerio')
const bodyParser = require('body-parser')
const Job = require('./model/Job')

const options = {
  uri: 'https://id.jobplanet.com/search?category=&query=&_rs_con=welcome&_rs_act=index&_rs_element=main_search_bar',
  transform: function (body) {
    return cheerio.load(body)
  }
}

const app = express()

app.use(bodyParser.json())

app.get('/scrapes', (req, res) => {
  rp(options)
    .then(($) => {
      const listJobs = []
      $('.result_unit_con').each((i, elem) => {
        listJobs.push({
          jobName: $(elem).find('.posting_name').text(),
          companyName: $(elem).find('.btn_open').text(),
          companyLogo: $(elem).find('.llogo > a > img').attr('src'),
          jobLocation: $(elem).find('.tags').eq(0).text(),
          jobFunction: $(elem).find('.tags').eq(1).text(),
          jobIndustry: $(elem).find('.tags').eq(2).text()
        })
      })

      Job.insertMany(listJobs)
        .then(
          () => {
            res.send({
              error: false,
              message: 'Data has been scrapped and created succesfully'
            })
          }
        )
        .catch(
          err => {
            res.send({
              error: false,
              message: err
            })
          }
        )
    })
    .catch(
      err => {
        res.status(200).send({
          error: true,
          message: err
        })
      })
})

app.get('/jobs', (req, res) => {
  Job.find()
    .then(
      jobs => {
        res.send({
          error: false,
          jobs: jobs
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

app.post('/jobs', (req, res) => {
  const jobName = req.body.jobName
  const companyName = req.body.companyName
  const companyLogo = req.body.companyLogo
  const jobLocation = req.body.jobLocation
  const jobFunction = req.body.jobFunction
  const jobIndustry = req.body.jobIndustry

  Job.create({
    jobName: jobName,
    companyName: companyName,
    companyLogo: companyLogo,
    jobLocation: jobLocation,
    jobFunction: jobFunction,
    jobIndustry: jobIndustry
  })
    .then(
      () => {
        res.send({
          error: false,
          message: 'Data has been created successully'
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

app.put('/jobs/:id', (req, res) => {
  const id = req.params.id
  const jobName = req.body.jobName
  const companyName = req.body.companyName
  const companyLogo = req.body.companyLogo
  const jobLocation = req.body.jobLocation
  const jobFunction = req.body.jobFunction
  const jobIndustry = req.body.jobIndustry

  Job.findOneAndUpdate({ _id: id }, {
    $set: {
      jobName: jobName,
      companyName: companyName,
      companyLogo: companyLogo,
      jobLocation: jobLocation,
      jobFunction: jobFunction,
      jobIndustry: jobIndustry
    }
  })
    .then(
      () => {
        res.send({
          error: false,
          message: 'Data has been updated successfuly.'
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
