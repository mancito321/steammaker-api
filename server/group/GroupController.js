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

// ALL GROUP
router.get('/group',(req,res)=>{
  connection.query(`SELECT gr.id,gr.name,i.name as 'iname',fr.name as 'frname',u.user,(SELECT numero FROM participants WHERE id_group = gr.id) as 'participantes' FROM steammakers.group gr JOIN franchise fr on gr.id_franchise = fr.id JOIN institution i on i.id = fr.id_institution JOIN users u on u.id = gr.mt;`, function (error, results, fields) {
    if (error) throw error;
    res.send(results)
    return results;
  });
  //connection.end();
});
// GROUP
router.get('/detail:id?',(req,res)=>{
  connection.query(`SELECT gr.id,gr.name,gr.punctuation,i.name as 'iname',fr.name as 'frname',u.user,(SELECT numero FROM participants WHERE id_group = gr.id) as 'participantes' FROM steammakers.group gr JOIN franchise fr on gr.id_franchise = fr.id JOIN institution i on i.id = fr.id_institution JOIN users u on u.id = gr.mt WHERE gr.id = ${req.query.id};`, function (error, results, fields) {
    if (error) throw error;
    res.send(results)
    return results;
  });
  //connection.end();
});


// DESARROLLO
router.get('/challenge',(req,res)=>{
  connection.query(`SELECT * FROM challenge_ok ok JOIN challenge ch on ok.id_challenge =ch.id WHERE ok.id_group = ${req.query.id};`, function (error, results, fields) {
    if (error) throw error;
    res.send(results)
    return results;
  });
  //connection.end();
});

router.get('/challengedeep',(req,res)=>{
  connection.query(`SELECT * FROM challenge_ok ok JOIN challenge ch on ok.id_challenge =ch.id WHERE ok.id_challenge = ${req.query.id} and ok.id_group=${req.query.group};`, function (error, results, fields) {
    if (error) throw error;
    res.send(results)
    return results;
  });
  //connection.end();
});





// Participantes
router.get('/participants:id?',(req,res)=>{
  connection.query(`SELECT * FROM participants WHERE id_group = ${req.query.id};`, function (error, results, fields) {
    if (error) throw error;
     if(results.length<1){
      res.send('0')
    }else{
      res.send(results)
    }
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
