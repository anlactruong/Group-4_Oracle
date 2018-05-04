const express = require('express');
const router = new express.Router();
const job = require('../controllers/job.js');
const auth = require('../controllers/AuthController.js')
const admin = require('../controllers/AdminController.js')
 
router.route('/job/:url?')
  .get(job.get);

router.route('/get_job_list')
  .get(job.getList)

router.route('/list_job_admin')
  .get(admin.listJobAdmin)

router.route('/list_job_group_admin')
  .get(admin.listJobGroupAdmin)

router.route('/login')
  .post(auth.login)

router.route('/create_job')
  .post(admin.createJob)

router.route('/update_job')
  .post(admin.updateJob)

router.route('/create_job_group')
  .post(admin.createJobGroup)

router.route('/update_job_group')
  .post(admin.updateJobGroup)

router.route('/change_status')
  .post(admin.changeStatus)
 
module.exports = router;
