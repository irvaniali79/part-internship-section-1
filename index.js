const {brogrammers} = require('brogrammers');
const { LoggerFacade } = require('brogrammers_logger');
const { createClient } = require('redis');
const EE = require('eventemitter3');

const config = require('./config');

const eventEmitter = new EE();
const responseHandler = require('./handlers/responseHandler/responseHandler');
const errorHandler = require('./handlers/errorHandler/errorHandler');

const app = new brogrammers(eventEmitter,undefined,config,responseHandler,errorHandler);

app.use('logger',new LoggerFacade({driver:'file',filePath:config.root+'/log.txt'}));
app.use('userData',createClient(config.userData.Client));
app.use('userParent',createClient(config.userParent.Client));

app.services.userData.connect();
app.services.userData.select(config.userData.selectDB);

app.services.userParent.connect();
app.services.userParent.select(config.userParent.selectDB);

module.exports = {
  eventEmitter,
  app,
  config
};

require('./handlers/log');



app.serve();




