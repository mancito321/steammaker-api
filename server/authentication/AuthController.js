var express = require('express');
//Files server

var router = express.Router();
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var config = require('../config');
var cdnUse= require('./files')
//File system module
var fs = require('fs');
const uuidv4 = require('uuid/v4');
const path = require('path');
//Used at the end
const multer = require('multer');
let upload = multer();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
// Users schema if using mongoose
// var User = require('../user/User');
const connection = require('../dbconf/conf');
// Reggistration
router.post('/register', function(req, res) {
  // Create salt and hashing
  var salt = bcrypt.genSaltSync(8);

  var hashedPassword = bcrypt.hashSync(req.body.password, salt);

  // creating new user sql sentence
  let sql = `INSERT INTO users(user,rol,email,active,password) VALUES ('${req.body.user}',1,'${req.body.email}',1,'${hashedPassword}')`;
  connection.query(sql,function (err, user) {
    if (err) return res.status(500).send("There was a problem registering the user."+err)
    // create a token
    var token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });
    res.status(200).send({ auth: true, token: token });
  });
});


//upload new files
router.post('/newfiletest',upload.any(), (req, res)=> {
  // Handling files

  let formData = req.files;



  cdnUse.upFiles('steammakers/'+req.body.text,'esunpdf.'+formData[0].originalname.split('.')[1],formData[0].buffer)
  // /cidstorage/steammakers/
  res.status(200).send("We are on test")

});
//NuevoReto
router.post('/newreto',upload.any(), (req, res)=> {
  var token = req.headers['x-access-token']
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
  jwt.verify(token, config.secret, function(err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.'+err });
    //Creamos los valores a colocar
    let today= new Date();
    let activo=0;
    req.body.activo ? activo =1:acivo=0;
    let sql = `INSERT INTO challenge(name,ca,fn,active,contenido,recursos) VALUES ('${req.body.NameReto}','${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}','','${activo}','${req.body.TextReto}','${req.body.recursos}')`;
    //Insertamos en la db
    let thisId=0;
    connection.query(sql,function (err, reto) {
      if (err) return res.status(500).send("There was a problem registering the challenge.")
      // Respondemos
      //
      let formData = req.files;
      console.log(formData);
      formData.forEach((file)=>{

        cdnUse.upFiles('steammakers/reto/retos/'+reto.insertId,file.fieldname+'.'+file.originalname.split('.')[1],file.buffer)
      })
      // cdnUse.upFiles('steammakers/'+req.body.text,'esunpdf.'+formData[0].originalname.split('.')[1],formData[0].buffer)
      res.status(200).send("send")
    })

  });
  // let formData = req.files;
  // cdnUse.upFiles('steammakers/'+req.body.text,'esunpdf.'+formData[0].originalname.split('.')[1],formData[0].buffer)
  // /cidstorage/steammakers/
  // res.status(200).send("We are on test")

});
//New group
router.post('/newgroup',upload.any(), (req, res)=> {
  //Validamos Token
  var token = req.headers['x-access-token']
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
  jwt.verify(token, config.secret, function(err, decoded) {

    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.'+err });
    //Creamos los valores a colocar

    // en olace van los participantes
    let sql = `INSERT INTO steammakers.group(id_franchise,name,numero,mt) VALUES(${req.body.franchise},'${req.body.name}','${req.body.numero_participantes}','${decoded.id}')`;
    //Insertamos en la db

    connection.query(sql,function (err, grupo) {
      if (err)
      if (err) return res.status(500).send("There was a problem registering the group.")
      // Respondemos
      let formData = req.files;
      formData.forEach((file)=>{
        cdnUse.upFiles('steammakers/grupo/'+grupo.insertId,file.fieldname+'.png')
      })
      // +file.originalname.split('.')[1],file.buffer
      // cdnUse.upFiles('steammakers/'+req.body.text,'esunpdf.'+formData[0].originalname.split('.')[1],formData[0].buffer)
      // Nuevos participantes
      let newsql = `INSERT INTO participants(id_group,name) VALUES(${grupo.insertId},'${req.body.participantes}')`
      connection.query(newsql,function (err, participants) {
        if (err) return res.status(500).send("There was a problem registering the participants.")
        // Respondemos
        // Gen salt and hash
        var salt = bcrypt.genSaltSync(8);
        var hashedPassword = bcrypt.hashSync(req.body.password, salt);
        // creating new user sql sentence
        let sql = `INSERT INTO users(user,rol,email,active,password,id_group) VALUES ('${req.body.user}',2,'',1,'${hashedPassword}',${grupo.insertId})`;
        connection.query(sql,function (err, user) {
          if (err) return res.status(500).send("There was a problem registering the user."+err)
          // create a token

          res.status(200).send("Nuevo Grupo creado");
        });

        // cdnUse.upFiles('steammakers/'+req.body.text,'esunpdf.'+formData[0].originalname.split('.')[1],formData[0].buffer)
      })
    })

  });
  // let formData = req.files;
  // cdnUse.upFiles('steammakers/'+req.body.text,'esunpdf.'+formData[0].originalname.split('.')[1],formData[0].buffer)
  // /cidstorage/steammakers/


});
// Get resources
router.get('/files',(req,res)=>{

  cdnUse.getFiles('steammakers/reto/retos/'+req.query.id,res)
})
// soluciones
router.get('/filesSol',(req,res)=>{

  cdnUse.getFiles('steammakers/reto/desarrollo/'+req.query.id+'/'+req.query.group,res)
})
// Get fileset
router.get('/resources',(req,res)=>{

  let sql = `SELECT * FROM steammakers.challenge WHERE id=${req.query.id}`
  connection.query(sql, (err, resourcesRes)=> {
    if (err) return res.status(500).send("There was a problem registering the solution.")
    // Upload files
    res.status(200).send(resourcesRes);
  });
})

// New Solution

router.post('/solucionreto',upload.any(), function(req, res) {
  //Verify token
  var token = req.headers['x-access-token'];
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

  jwt.verify(token, config.secret, (err, decoded) =>{
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.'+err });
    // date is creates
    let today= new Date();
    // sql sentence is crated
    let sql = `INSERT INTO challenge_ok(id_group,id_challenge,ca,recurso) VALUES(${decoded.group},${req.body.Retoid},'${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}','${req.body.Contenidos}')`
    // Conection in db
    connection.query(sql, (err, challenge)=> {
      if (err) return res.status(500).send("There was a problem registering the solution.")
      // Upload files
      let formData = req.files;
      formData.forEach((file)=>{
        cdnUse.upFiles('steammakers/reto/desarrollo/'+req.body.Retoid+'/'+decoded.group,file.fieldname+'.'+file.originalname.split('.')[1],file.buffer)
      })
      res.status(200).send("Solución subida");
    });
  });
});





// My info token
router.get('/me', function(req, res) {


  var token = req.headers['x-access-token'];
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

  jwt.verify(token, config.secret, function(err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.'+err });
    // send token stats
    res.status(200).send(decoded);
  });
});

//Login request
router.post('/login', function(req, res) {
  let sql=`SELECT * FROM users where user like '%${req.body.user}%';`
  connection.query(sql,function (err, results, fields) {
    if (err) return res.status(500).send('Error on the server.'+err);
    if (results == '') return res.status(404).send('No user found.');
    // compare password



    var passwordIsValid = bcrypt.compareSync(req.body.password,results[0].password);
    if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
    var token = jwt.sign({ id: results[0].id,rol: results[0].rol,group:results[0].id_group }, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });
    res.status(200).send({ auth: true, token: token });

  });
});

//Logout request
router.get('/logout', function(req, res) {
  res.status(200).send({ auth: false, token: null });
});

module.exports = router;
