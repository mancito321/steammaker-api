const Express = require('express');
const App= Express();

App.get('/',(reg,res)=>res.send('Julian is gay'));

App.listen(process.env.PORT || 5000,()=>console.log('Example app listen on port 5000'))
