const {brogrammers} = require('brogrammers');
const { LoggerFacade } = require('brogrammers_logger');
const EE = require('eventemitter3');

const config = require('./config');

const eventEmitter = new EE();
const responseHandler = require('./Handlers/responseHandler/responseHandler');
const errorHandler = require('./Handlers/errorHandler/errorHandler');

const app = new brogrammers(eventEmitter,undefined,config,responseHandler,errorHandler);

app.use('logger',new LoggerFacade({driver:'file',filePath:config.root+'/log.txt'}));

module.exports = {
  eventEmitter,
  app,
  config
};

require('./Handlers/log/');



app.serve();




