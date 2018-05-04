const express = require('express');
const router = new express.Router();
const job = require('../controllers/job.js');
 
router.route('/job/:url?')
  .get(job.get);

router.route('/get_job_list')
  .get(job.getList)
 
module.exports = router;
