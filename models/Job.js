const mongoose = require('../config/db')

const nameSchema = new mongoose.Schema(
  {
    jobName: String,
    companyName: String,
    companyLogo: String,
    jobLocation: String,
    jobFunction: String,
    jobIndustry: String
  }, {
    timestamps: true
  }
)

const Job = mongoose.model('Job', nameSchema)

module.exports = Job
