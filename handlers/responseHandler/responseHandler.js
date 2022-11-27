const {responseResolver} = require('./helper');
const responses = require('../../configs/responseHandlerConfig');

/* eslint-disable require-jsdoc */
function responseHandler(req,res){
  if(res.type == 'pipe'){
    res.response.pipe(res);
    return;
  }
  if(res.type in responses){
    responseResolver(res,responses[res.type]['headers'](res));
    return;
  }
  responseResolver(res);
}

module.exports = responseHandler;

