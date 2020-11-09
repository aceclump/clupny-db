var express = require('express');
var router = express.Router();
var cors = require('cors');
var fs = require('fs');

router.post('/', function(req, res) { 
  if(!fs.existsSync('../clupny-project-site/public/projectFiles/'+req.body.id)) {
    fs.mkdirSync('../clupny-project-site/public/projectFiles/'+req.body.id)
  }
  if(!fs.existsSync('../clupny-project-site/public/projectFiles/'+req.body.id + '/' + req.body.label)) {
    fs.mkdirSync('../clupny-project-site/public/projectFiles/'+req.body.id + '/' + req.body.label)
  }
  if(!fs.existsSync('../clupny-project-site/public/projectFiles/' + req.body.id + '/' + req.body.label + '/' + req.files[0].originalname)) {
    fs.renameSync(
      './public/'+req.files[0].filename,
      '../clupny-project-site/public/projectFiles/'+req.body.id + '/' + req.body.label + '/' + req.files[0].originalname
    )
  }
});

module.exports = router;
