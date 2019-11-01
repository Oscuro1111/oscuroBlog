var express = require('express');
var router = express.Router();

var fs = require("fs");
/* GET home page. */

module.exports = function (dir) {
  router.get('/', function (req, res, next) {
    fs.readFile(dir+'/libs/Knight/index.html', (err, data) => {
      if (err) throw err;
      res.render('index', { title: 'Home', errors: [], data: data });
    });
  });
  return router;
}

