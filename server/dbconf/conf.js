var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'user_sm',
  database : 'steammakers',
  password : 'sm_Cid2018.'
});

module.exports = connection;
