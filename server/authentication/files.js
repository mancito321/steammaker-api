let request = require('request');
const ApiKey='acccc69a-adf1-4720-be601db70302-7429-4759';//No Dejar visible al subir
const storageZoneName = 'cidstorage'
let cdnBunnyApi = {
  getFiles:(path)=>{
    console.log(`https://storage.bunnycdn.com/${storageZoneName}/${path}/`);
    request({
      method: 'GET',
      url: `https://storage.bunnycdn.com/${storageZoneName}/${path}/`,
      headers: {
        'AccessKey':ApiKey,
        'Accept': 'application/json'
      }}, function (error, response, body) {
        console.log('Status:', response.statusCode);
        console.log('Headers:', JSON.stringify(response.headers));
        console.log('Response:', body);
      });
    },
    upFiles:(path,fileName,content)=>{
      request({
        method: 'PUT',
        headers: {'AccessKey':ApiKey},
        url: `https://storage.bunnycdn.com/${storageZoneName}/${path}/${fileName}`,
        body:content
      }, function (error, response, body) {
        console.log('Status:', response.statusCode);
        console.log('Headers:', JSON.stringify(response.headers));
        console.log('Response:', body);
      });
    }

  }
  let itsame =function(){
    return false;
  }
  module.exports = cdnBunnyApi
