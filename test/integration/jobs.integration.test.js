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
          res.body.should.be.a('object')
          res.status.should.equal(200)
          res.body.error.should.equal(false)
          res.body.jobs.length.should.be.equal(0)
          done()
      })
    })
  })

  describe('GET /jobs/:id', () => {
    it('it should GET a job by the given id', (done) => {
      const job = new Job({
        jobName: 'Programmer',
        companyName: 'Google',
        companyLogo: 'http://facebook.com',
        jobLocation: 'California',
        jobFunction: 'testing',
        jobIndustry: 'IT'
      })

      job.save((err, job) => {
        chai.request(server)
          .get('/jobs/' + job.id)
          .end((err, res) => {
            should.not.exist(err)
            res.status.should.equal(200)
            res.body.error.should.equal(false)
            res.body.job.should.have.property('jobName').eql(job.jobName)
            res.body.job.should.have.property('_id').eql(job.id)
            done()
          })
      })
    })
  })

  describe('POST /jobs', () => {
    it('it should POST', (done) => {
      const job = {
        jobName: 'Programmer',
        companyName: 'Google',
        companyLogo: 'http://facebook.com',
        jobLocation: 'California',
        jobFunction: 'testing',
        jobIndustry: 'IT'
      }

      chai.request(server)
        .post('/jobs')
        .send(job)
        .end((err, res) => {
          should.not.exist(err)
          res.status.should.equal(200)
          res.body.error.should.equal(false)
          res.body.should.have.property('message').eql('Data has been created successully')
          done()
        })
    })
  })

  describe('GET /scrapes', () => {
    // PENDING
    it('it should scrapes from websites and save to database')
  })

  describe('PUT /jobs/:id', () => {
    it('it should update a job by the given id', (done) => {
      const job = new Job({
        jobName: 'Programmer',
        companyName: 'Google',
        companyLogo: 'http://facebook.com',
        jobLocation: 'California',
        jobFunction: 'testing',
        jobIndustry: 'IT'
      })

      job.save((err, job) => {
        chai.request(server)
          .put('/jobs/' + job.id)
          .send({ jobName: 'Test Job' })
          .end((err, res) => {
            should.not.exist(err)
            res.status.should.equal(200)
            res.body.error.should.equal(false)
            res.body.should.have.property('message').eql('Data has been updated successfuly.')
            done()
          })
      })
    })
  })

  describe('DELETE /jobs/:id', () => {
    it('it should delete a job by the given id', (done) => {
      const job = new Job({
        jobName: 'Programmer',
        companyName: 'Google',
        companyLogo: 'http://facebook.com',
        jobLocation: 'California',
        jobFunction: 'testing',
        jobIndustry: 'IT'
      })

      job.save((err, job) => {
        chai.request(server)
          .delete('/jobs/' + job.id)
          .send({ jobName: 'Test Job' })
          .end((err, res) => {
            should.not.exist(err)
            res.status.should.equal(200)
            res.body.error.should.equal(false)
            res.body.should.have.property('message').eql('Data has been deleted successfuly.')
            done()
          })
      })
    })
  })

})
