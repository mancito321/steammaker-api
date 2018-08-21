const Express = require('express');
const App= Express();
var cors = require('cors');
const connection = require('./server/dbconf/conf');
var UserController = require('./server/user/UserController');
var AuthController = require('./server/authentication/AuthController');
var ChallengeController = require('./server/challenge/ChallengeController');
var GroupController = require('./server/group/GroupController');

const message = {id:1,"title":"Proyectos",name:"proyectos",parent:"0",order:"1",url:"/proyectos",icon:"la la-building",active:"1",interna:"0"}
App.use(cors())

App.use('/users', UserController);
App.use('/api/auth', AuthController);
App.use('/challenge', ChallengeController);
App.use('/group', GroupController);
App.get('/',(reg,res)=>res.send('nothing'));
App.get('/hola',(reg,res)=>res.json({msg: 'This is CORS-enabled for a Single Route'}));
App.get('/menu',(reg,res)=>{

  // connection.query('SELECT * FROM escuela.menu;', function (error, results, fields) {
  //   if (error) throw error;
  //   res.send(results[0])
  //   return results;
  // });
  //connection.end();
});
App.listen(process.env.PORT || 5000,()=>console.log('Example app listen on port 5000'));
