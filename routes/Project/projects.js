var express = require('express');
var router = express.Router();
var projects = require("../../project.model.js");

router.get('/', function(req, res) {
  projects.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message
      })
    }
    else {
      res.send(data);
    }
  });
});

module.exports = router;
