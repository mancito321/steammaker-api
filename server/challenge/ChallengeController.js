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
  connection.query(`SELECT * FROM challenge WHERE active = 1 ORDER BY ca DESC LIMIT 1`, function (error, results, fields) {
    if (error) throw error;
    res.send(results)
    return results;
  });
  //connection.end();
});
router.get('/boton',(req,res)=>{
  connection.query(`SELECT count(*) as 'boton' FROM challenge_ok where id_group = ${req.query.id_grupo} and id_challenge = ${req.query.id_challenge};`, function (error, results, fields) {
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
  connection.query(`SELECT gr.name as 'group_name',dev.* FROM challenge_ok dev JOIN steammakers.group gr on gr.id = dev.id_group where dev.id_challenge = ${req.query.id}`, function (error, results, fields) {
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



// Punctuatio
router.post('/punctuation',(req,res)=>{
  connection.query(`UPDATE challenge_ok SET punctuation = ${req.body.punctuation} , edit = '${req.body.editar}',formato = '${req.body.formato}', bigart='${req.body.bigart}', fotografico='${req.body.fotografico}' ,video='${req.body.video}', equipo='${req.body.equipo}' WHERE id_group = ${req.body.group} and id_challenge=${req.body.id};`, function (error, results, fields) {
    if (error) throw error;
   connection.query(`UPDATE steammakers.group SET punctuation = ${req.body.punctuationT} WHERE id = ${req.body.group};`, function (error, results, fields) {
    if (error) throw error;
    res.send(results)
    return results;
    });
  });
  //connection.end();
});

router.post('/active/edit',(req,res)=>{
  connection.query(`UPDATE challenge SET active = ${req.body.active} WHERE id = ${req.body.id};`, function (error, results, fields) {
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

//desarrollos

router.get('/desarrollo',(req,res)=>{
  console.log(req.params)
  connection.query(`SELECT ok.id,gr.id, gr.punctuation, ch.id as 'chid' ,gr.name as 'gname',u.user as 'uname', ok.ca FROM challenge_ok ok JOIN steammakers.group gr on gr.id = ok.id_group JOIN users u on u.id = gr.mt JOIN challenge ch on ch.id = ok.id_challenge where ch.id = ${req.query.id};`, function (error, results, fields) {
    if (error) throw error;
    res.send(results)
    return results;
  });
  //connection.end();
});
router.get('/desarrolloDet',(req,res)=>{
  console.log(req.params)
  connection.query(`SELECT ok.id,gr.id, gr.punctuation, ch.id as 'chid' ,gr.name as 'gname',u.user as 'uname', ok.ca FROM challenge_ok ok JOIN steammakers.group gr on gr.id = ok.id_group JOIN users u on u.id = gr.mt JOIN challenge ch on ch.id = ok.id_challenge where gr.id = ${req.query.group} and ch.id = ${req.query.id};`, function (error, results, fields) {
    if (error) throw error;
    res.send(results)
    return results;
  });
  //connection.end();
});


router.get('/challenges',(req,res)=>{
  connection.query(`SELECT c.*,(SELECT COUNT(*) FROM challenge_ok where id_challenge = c.id) as 'desarrollos' FROM challenge c`, function (error, results, fields) {
    if (error) throw error;
    res.send(results)
    return results;
  });
  //connection.end();
});


module.exports = router;
