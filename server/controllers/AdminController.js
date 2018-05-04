const database = require('../services/database.js')
const moment = require('moment')

module.exports = {
  async listJobAdmin (req, res) {
    try {
      const query1 = `select * from jobs`;
      const result = (await database.simpleExecute(query1)).rows;
      res.send(result)
    } catch (err) {
      res.status(500).send({
        error: 'there was an error'
      })
    }
  },
  async listJobGroupAdmin (req, res) {
    try {
      const query1 = `select * from jobGroups`;
      const result = (await database.simpleExecute(query1)).rows;
      res.send(result)
    } catch (err) {
      res.status(500).send({
        error: 'there was an error'
      })
    }
  },
  async createJob (req, res) {
    try {
      // create new row in database
      const query = `select * from jobs`;
      const tmp = (await database.simpleExecute(query)).rows;
      const lastItem = tmp[tmp.length-1];
      let myID = lastItem.ID + 1;
      const query1 = `INSERT INTO jobs VALUES(`+
      `'`+myID+`'`+`,`+
      `'`+req.body.jobDetail.groupID+`'`+`,`+
      `'`+req.body.jobDetail.title+`'`+`,`+
      `'`+ req.body.jobDetail.url + '-' + myID +`'`+`,`+
      `'`+req.body.jobDetail.description+`'`+`,`+
      `'`+req.body.jobDetail.requirement+`'`+`,`+
      `'`+req.body.jobDetail.benefit+`'`+`,`+
      `'`+req.body.jobDetail.howToApply+`'`+`,`+
      `'`+req.body.jobDetail.imgLink+`'`+`,`+
      `'`+req.body.jobDetail.status+`'`+`,`+
      `'`+req.body.jobDetail.createdAdmin+`'`+`,`+
      `'`+moment().format('DD-MM-YYYY') +`'`+`)`;
      await database.simpleExecute(query1);
      res.send({ 'success': 'true' })
    } catch (err) {
      res.status(500).send({
        error: 'an error occured trying to create job'
      })
    }
  },
  async updateJob (req, res) {
    try {
      // update in database
      query1 = `UPDATE jobs SET `
      + `title = ` + `'` + req.body.jobDetail.title + `', `
      + `groupID = '`+req.body.jobDetail.groupID + `', `
      + `description = '`+req.body.jobDetail.description + `', `
      + `requirement = '`+req.body.jobDetail.requirement + `', `
      + `benefit = '`+req.body.jobDetail.benefit + `', `
      + `howToApply = '`+req.body.jobDetail.howToApply + `', `
      + `imgLink = '` + req.body.jobDetail.imgLink + `' `
      + `WHERE url = '` + req.body.jobDetail.url + `'`;
      await database.simpleExecute(query1);
      res.send({ 'success': 'true' })
    } catch (err) {
      res.status(500).send({
        error: 'an error occured trying to update job'
      })
    }
  },
  async createJobGroup (req, res) {
    try {
      // create new row in database
      const query = `select * from jobGroups`;
      const tmp = (await database.simpleExecute(query)).rows;
      const lastItem = tmp[tmp.length-1];
      let myID = lastItem.ID + 1;
      const query1 = `INSERT INTO jobGroups VALUES(`+
      `'`+myID+`'`+`,`+
      `'`+req.body.jobGroupDetail.title+`'`+`,`+
      `'`+req.body.jobGroupDetail.imgLink+`'`+`,`+
      `'`+req.body.jobGroupDetail.status+`'`+`,`+
      `'`+req.body.jobGroupDetail.createdAdmin+`'`+`,`+
      `'`+moment().format('DD-MM-YYYY') +`'`+`)`;
      await database.simpleExecute(query1);
      res.send({ 'success': 'true' })
    } catch (err) {
      res.status(500).send({
        error: 'an error occured trying to create jobGroup'
      })
    }
  },
  async updateJobGroup (req, res) {
    try {
      query1 = `UPDATE jobGroups SET title = ` + `'` + req.body.jobGroupDetail.title + `', `
      + `imgLink = '` + req.body.jobGroupDetail.imgLink + `'` +
      ` WHERE id = ` + req.body.jobGroupDetail.id;
      await database.simpleExecute(query1);
      res.send({ 'success': 'true' })
    } catch (err) {
      res.status(500).send({
        error: 'an error occured trying to update jobGroup'
      })
    }
  },
  async changeStatus (req, res) {
    try {
      if (req.body.objectType === 1) {
        let query = `select * from jobs where id = ` + req.body.objectID;
        let oldStatus = (await database.simpleExecute(query)).rows[0].STATUS
        let newStatus = Math.abs(oldStatus - 1)
        let query1 = `UPDATE jobs SET status = ` + newStatus +
        ` WHERE id = ` + req.body.objectID;
        await database.simpleExecute(query1)
      }
      if (req.body.objectType === 2) {
        let query = `select * from jobGroups where id = ` + req.body.objectID;
        let oldStatus = (await database.simpleExecute(query)).rows[0].STATUS
        let newStatus = Math.abs(oldStatus - 1)
        let query1 = `UPDATE jobGroups SET status = ` + newStatus +
        ` WHERE id = ` + req.body.objectID;
        await database.simpleExecute(query1)
      }
      res.send({
        success: 'true'
      })
    } catch (err) {
      res.status(500).send({
        error: 'an error occured'
      })
    }
  }
}
