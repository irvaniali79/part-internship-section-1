const errors = require('../../configs/errorHandlerConfig');

function errorHandler(req,res,e){
  let error;
  if(!(e.type in errors))error = e;
  else error = errors[e.type];
  res.writeHead(error.code, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    meta:{
      code:error.metaCode||'UNHANDLED'
    },
    message:error.message
  }));
  
}
module.exports = errorHandler;
