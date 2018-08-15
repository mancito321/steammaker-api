var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const connection = require('../dbconf/conf');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
// Users schema if using mongoose
// var User = require('./User');

// INSTITUTION
router.get('/institution',(req,res)=>{
  connection.query(`SELECT * FROM institution`, function (error, results, fields) {
    if (error) throw error;
    res.send(results)
    return results;
  });
  //connection.end();
});

// FRANCHISE
router.get('/franchises:id?',(req,res)=>{
  connection.query(`SELECT * FROM franchise WHERE id_institution = ${req.query.id}`, function (error, results, fields) {
    if (error) throw error;
    res.send(results)
    return results;
  });
  //connection.end();
});



module.exports = router;
