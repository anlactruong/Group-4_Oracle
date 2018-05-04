const http = require('http');
const express = require('express');
const webServerConfig = require('../config/web-server.js');
const database = require('./database.js');
const morgan = require('morgan');
const router = require('./router.js');
const cors = require('cors');
const bodyParser = require('body-parser')

let httpServer;
 
function initialize() {
  return new Promise((resolve, reject) => {
    const app = express();
    httpServer = http.createServer(app);
    app.use(morgan('combined'));
    app.use(cors())
    app.use(bodyParser.json())
    // Mount the router at /api so all its routes start with /api
    app.use('/api', router);
    app.get('/', async (req, res) => {
      const result = await database.simpleExecute('select user, systimestamp from dual');
      const user = result.rows[0].USER;
      const date = result.rows[0].SYSTIMESTAMP;
      res.end(`DB user: ${user}\nDate: ${date}`);
    });
    httpServer.listen(webServerConfig.port, err => {
      if (err) {
        reject(err);
        return;
      }
      console.log(`Web server listening on localhost:${webServerConfig.port}`);
      resolve();
    });
  });
}
 
module.exports.initialize = initialize;

function close() {
  return new Promise((resolve, reject) => {
    httpServer.close((err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}
 
module.exports.close = close;