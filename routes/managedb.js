var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var assert = require('assert');


var url = "mongodb://joeydash:joeydash@ds155674.mlab.com:55674/joeydash";

/* GET home page. */
router.post('/check', function(req, res, next) {
    var context = { title: 'Melvano',tagline:"Come learn with us!" }
    res.render('index',context );
});
router.post('/update', function(req, res, next) {
    var context = { title: 'Melvano',tagline:"Come learn with us!" }
    res.render('index',context );
});
router.post('/insert', function(req, res, next) {
    var item = {
        username: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password:req.body.password,
        time: new Date(),
    };
    mongo.connect(url,function (err,db) {
        assert.equal(null,err);
        db.collection('user-data').insertOne(item,function (error,result) {
            assert.equal(null,error);
            console.log("item inserted!");
        });
    });
});
router.get('/', function(req, res, next) {
    res.send('managedb working fine!');
});

module.exports = router;