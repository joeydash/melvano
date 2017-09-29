var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:id', function(req, res, next) {
  res.send('you are  '+req.params.id);
});
router.get('/', function(req, res, next) {
    res.send('please search for users!');
});

module.exports = router;
