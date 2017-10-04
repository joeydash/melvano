var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var context = { title: 'Melvano',tagline:"Come learn with us!" }
  res.render('index',context );
});
router.get('/signup', function(req, res, next) {
    var cookie = req.cookies.melvano;
    if (cookie === undefined)
    {
        var context = { title: 'Melvano',tagline:"Come learn with us!" }
        res.render('register',context );
    }
    else
    {
        res.redirect('/');
    }
    next();
});

module.exports = router;
