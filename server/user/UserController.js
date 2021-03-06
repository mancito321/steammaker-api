var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const connection = require('../dbconf/conf');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
// Users schema if using mongoose
// var User = require('./User');
//Get all users
router.get('/',(req,res)=>{
  connection.query('SELECT * FROM users;', function (error, results, fields) {
    if (error) throw error;
    res.send(results)
    return results;
  });
  //connection.end();
});
// CREATES A NEW USER
router.get('/user/all',(req,res)=>{
  connection.query(`SELECT * FROM users`, function (error, results, fields) {
    if (error) throw error;
    res.send(results)
    return results;
  });
  //connection.end();
});

router.get('/user/:id',(req,res)=>{
  connection.query(`SELECT * FROM users WHERE id= ${req.params.id};`, function (error, results, fields) {
    if (error) throw error;
    res.send(results)
    return results;
  });
  //connection.end();
});


module.exports = router;
