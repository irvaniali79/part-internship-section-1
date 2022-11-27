const errors = require('../../configs/errorHandlerConfig');

function errorHandler(req,res,e){
  let error;
  if(!(e.code in errors))error = e;
  else error = errors[e.code];
  res.writeHead(res.status, { 'Content-Type': res.type });
  res.end(JSON.parse(error));
  
}
module.exports = errorHandler;
