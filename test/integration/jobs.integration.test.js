process.env.NODE_ENV = 'test'

const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should()
const Job = require('../../models/Job')
const server = require('../../index')

chai.use(chaiHttp)

describe('Job', () => {
  beforeEach((done) => {
    Job.deleteMany({}, () => {
      done()
    })
  })

  describe('GET /jobs', () => {
    it('it should GET all the jobs', (done) => {
      chai.request(server)
        .get('/jobs')
        .end((err, res) => {
          should.not.exist(err)
          res.status.should.equal(200)
          res.body.error.should.equal(false)
          done()
      })
    })
  })
})
