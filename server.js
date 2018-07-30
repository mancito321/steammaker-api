const Express = require('express');
const App= Express();
const connection = require('./server/dbconf/conf')

App.get('/',(reg,res)=>res.send('puto is gay'));
App.get('/hola',(reg,res)=>res.send('{"id":1,"title":"Proyectos","name":"proyectos","parent":"0","order":"1","url":"/proyectos","icon":"la la-building","active":"1","interna":"0"}'));
App.get('/menu',(reg,res)=>{
  // connection.connect(function(err) {
  //   if (err) {
  //     console.error('error connecting: ' + err.stack);
  //     return;
  //   }
  //
  //   console.log('connected as id ' + connection.threadId);
  // });
  connection.query('SELECT * FROM escuela.menu;', function (error, results, fields) {
    if (error) throw error;
    res.send(results[0])
    return results;
  });
  //connection.end();
});
App.listen(process.env.PORT || 5000,()=>console.log('Example app listen on port 5000'));
