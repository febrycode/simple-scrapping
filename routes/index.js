const jobService = require('../services/jobs')

function init (server) {
  server.get('*', function (req, res, next) {
    console.log('Request was made to: ' + req.originalUrl)
    return next()
  })

  server.get('/scrapes', jobService.scrapeJob)
  server.get('/jobs', jobService.getAll)
  server.get('/jobs/:id', jobService.getById)
  server.post('/jobs', jobService.createJob)
  server.put('/jobs/:id', jobService.updateJob)
  server.delete('/jobs/:id', jobService.deleteJob)
}

module.exports = {
  init
}
