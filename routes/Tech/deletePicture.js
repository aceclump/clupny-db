var express = require('express');
var router = express.Router();
var cors = require('cors');
var fs = require('fs');

router.post('/', function(req, res) { 
  fs.unlinkSync(
    '../clupny-project-site/public/' + req.body.picture.substring(2)
  )
});

module.exports = router;
