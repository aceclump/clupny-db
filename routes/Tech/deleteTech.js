var express = require('express');
var router = express.Router();
var Tech = require('../../tech.model.js')

router.post('/', function(req, res) {
  Tech.deleteTech(req.body.id, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message
      })
    }
    else {
      res.send(data);
    }
  }
  )
});

module.exports = router;
