var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const connection = require('../dbconf/conf');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
// Users schema if using mongoose
// var User = require('./User');
// GET ALL CHALLENGE
router.get('/challenge/all',(req,res)=>{
  connection.query(`SELECT * FROM challenge`, function (error, results, fields) {
    if (error) throw error;
    res.send(results)
    return results;
  });
  //connection.end();
});
router.get('/challenge/last',(req,res)=>{
  connection.query(`SELECT * FROM challenge ORDER BY ca DESC LIMIT 1`, function (error, results, fields) {
    if (error) throw error;
    res.send(results)
    return results;
  });
  //connection.end();
});

// DOCUMENTATION
router.get('/challenge/documentation:id?',(req,res)=>{
  connection.query(`SELECT * FROM documentation where id_challenge = ${req.query.id} LIMIT 3`, function (error, results, fields) {
    if (error) throw error;
    res.send(results)
    return results;
  });
  //connection.end();
});
// DEVELOPS
router.get('/challenge/develops:id?',(req,res)=>{
  connection.query(`SELECT gr.name as 'group_name',dev.* FROM development dev JOIN steamakers.group gr on gr.id = dev.id_group where dev.id_challenge = ${req.query.id}`, function (error, results, fields) {
    if (error) throw error;
    res.send(results)
    return results;
  });
  //connection.end();
});
// Challenge
router.get('/actual:id?',(req,res)=>{
  connection.query(`SELECT * FROM challenge WHERE id = ${req.query.id};`, function (error, results, fields) {
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
