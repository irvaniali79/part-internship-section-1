const {responseResolver} = require('./helper');
const responses = require('../../configs/responseHandlerConfig');

/* eslint-disable require-jsdoc */
function responseHandler(req,res){
  if(res.type == 'pipe'){
    res.response.pipe(res);
    return;
  }
  if(res.type in responses){
    res.status = responses[res.type].status;
    responseResolver(res,responses[res.type].headers?responses[res.type].headers(res):undefined);
    return;
  }
  responseResolver(res);
}

module.exports = responseHandler;

