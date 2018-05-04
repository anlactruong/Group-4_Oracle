const express = require('express');
const router = new express.Router();
const job = require('../controllers/job.js');
 
router.route('/job/:url?')
  .get(job.get);
 
module.exports = router;
