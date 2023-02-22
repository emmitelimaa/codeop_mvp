var express = require('express');
var router = express.Router();
const db = require("../model/helper");

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.get("/influencers", function(req, res, next) {
  db("SELECT * FROM influencers;")
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err.message));
});

module.exports = router;
