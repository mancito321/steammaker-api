var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var config = require('../config');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
// Users schema if using mongoose
// var User = require('../user/User');
const connection = require('../dbconf/conf');
// Reggistration
router.post('/register', function(req, res) {
  // Create salt and hashing
  var salt = bcrypt.genSaltSync(8);
  console.log(req.body.password);
  var hashedPassword = bcrypt.hashSync(req.body.password, salt);
  console.log(hashedPassword);
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



// My info token
router.get('/me', function(req, res) {
  var token = req.headers['x-access-token'];
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

  jwt.verify(token, config.secret, function(err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.'+err });

    res.status(200).send(decoded);
    // User.findById(decoded.id,
    //   { password: 0 }, // projection
    //   function (err, user) {
    //     if (err) return res.status(500).send("There was a problem finding the user.");
    //     if (!user) return res.status(404).send("No user found.");
    //     res.status(200).send(user);
    //   });
  });
});

//Login request
router.post('/login', function(req, res) {
  let sql=`SELECT * FROM users where user like '%${req.body.user}%';`
  connection.query(sql,function (err, results, fields) {
    if (err) return res.status(500).send('Error on the server.'+err);
    if (results == '') return res.status(404).send('No user found.');
    // compare password
    console.log(req.body.password);
    console.log(results[0].password);
    var passwordIsValid = bcrypt.compareSync(req.body.password,results[0].password);
    if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
    var token = jwt.sign({ id: results[0]._id }, config.secret, {
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
