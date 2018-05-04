const job = require('../db_apis/job.js');
 
async function get(req, res, next) {
  try {
    const context = {};
    context.url = req.params.url;
    const rows = await job.find(context);
    if (req.params.url) {
      if (rows.length === 1) {
        res.status(200).json(rows[0]);
      } else {
        res.status(404).end();
      }
    } else {
      res.status(200).json(rows);
    }
  } catch (err) {
    next(err);
  }
}

async function getList(req, res, next) {
  try {
    let lst = await job.findList();
    res.status(200).json(lst)
  } catch (err) {
    next(err);
  }
}
 
module.exports.get = get;
module.exports.getList = getList;