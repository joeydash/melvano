var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var assert = require('assert');


var url = "mongodb://localhost:27017/test";

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
        name: "joeydash"
    }
    mongo.connect(url,function (err,db) {
        assert.equal(null,err);
        db.collection('user_data').insertOne(item,function (error,result) {
            assert.equal(null,error);
            console.log("item inserted!");
        });
    });

    res.render('index',context );
});

module.exports = router;