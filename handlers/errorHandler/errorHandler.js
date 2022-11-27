const errors = require('../../configs/errorHandlerConfig');

function errorHandler(req,res,e){
  let error;
  if(!(e.code in errors))error = e;
  else error = errors[e.code];
  res.writeHead(error.code, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    message:error.message
  }));
  
}
module.exports = errorHandler;
