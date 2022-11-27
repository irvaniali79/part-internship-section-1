const errorHandlerConfig = require('../../../configs/errorHandlerConfig');

module.exports = class notMatchError extends Error{
  constructor(message){
    super();
    this.message = message + ' ' + errorHandlerConfig['wrong-parameter'].message;
    this.type = 'notMatched';
    this.code = 403;
  }
};