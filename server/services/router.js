const express = require('express');
const router = new express.Router();
const job = require('../controllers/job.js');
const auth = require('../controllers/AuthController.js')
 
router.route('/job/:url?')
  .get(job.get);

router.route('/get_job_list')
  .get(job.getList)

router.route('/login')
  .post(auth.login)
 
module.exports = router;
