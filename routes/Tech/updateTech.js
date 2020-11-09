var express = require('express');
var router = express.Router();  
var Tech = require('../../tech.model.js')

router.post('/', function(req, res) {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Tech.updateTech(req.body.id , req.body, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message
      });
    else res.send(data);
  });
});

module.exports = router;
