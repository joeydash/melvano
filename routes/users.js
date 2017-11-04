var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var url = "mongodb://manager:joeydash@ds155674.mlab.com:55674/joeydash";
mongoose.connect(url, { useMongoClient: true });
var Schema = mongoose.Schema;


var userDataSchema = new Schema({
    userName : {
        unique: true,
        type : String
    },
    name : {type :String , required : true},
    email : {type :String , required : true},
    password : {type :String , required : true},
    imageUrl : {type :String , default : "https://cad.onshape.com/images/placeholder-user.png"}
},{collection : "melvanoUsers"});
var userData = mongoose.model('melvanoUsers',userDataSchema);

router.get('/:id', function(req, res, next) {
        userData.findOne({userName : req.params.id}).select({name : 1, email : 1, _id : 0}).then(function (doc,err) {
        if (err){
            console.log(err);
            res.send("Error in server!");
        }else{
            if (doc){
                res.render('users',doc );
            }else{
                res.send("No users found!");
            }

        }
    });
});
router.post('/readUser', function(req, res, next) {
    userData.findOne(req.body).then(function (doc,err) {
        if (err){
            res.send("Error in server!");
            console.log(err);
        }else{
            res.json(doc);
        }
    });
});
router.post('/createUser', function(req, res, next) {
    var data = new userData(req.body);
    data.save(function (err, result) {
        if (err){
            res.send("Error in server!");
            console.log(err);
        }else{
            res.json(result);
        }
    });
});

router.post('/updateUserImageUrl', function(req, res, next) {

    if (req.body.id && req.body.imageUrl){
        userData.findOne({_id : req.body.id}).then(function (doc,err) {
            if (err){
                res.send("Error in server!");
                console.log(err);
            }else{
                doc.imageUrl = req.body.imageUrl;
                doc.save(function (err,result) {
                    if (err){
                        res.send("Error in server!");
                        console.log(err);
                    }else{
                        res.json(result);
                    }
                });
            }
        });
    }else{
        res.json({
            errorCode : 1082,
            error : "Data can only be updated by using id"
        });
    }
});
router.post('/deleteUser', function(req, res, next) {
    if (req.body.id){
        userData.findOneAndRemove({_id : req.body.id}).exec(function (err, result) {
            if (err){
                res.send("Server Error!");
                console.log(err)
            }else{
                res.json(result);
            }
        });
    }else{
        res.json({
            errorCode : 1081,
            error : "Data can only be deleted by using id"
        });
    }
});

module.exports = router;
