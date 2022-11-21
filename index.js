const {brogrammers} = require('brogrammers');
const { LoggerFacade } = require('brogrammers_logger');
const { createClient } = require('redis');
const EE = require('eventemitter3');

const config = require('./config');

const eventEmitter = new EE();
const responseHandler = require('./Handlers/responseHandler/responseHandler');
const errorHandler = require('./Handlers/errorHandler/errorHandler');

const app = new brogrammers(eventEmitter,undefined,config,responseHandler,errorHandler);

app.use('logger',new LoggerFacade({driver:'file',filePath:config.root+'/log.txt'}));
app.use('redis1',createClient(config.redis1.Client));
app.use('redis2',createClient(config.redis2.Client));

app.services.redis1.connect();
app.services.redis1.select(config.redis1.selectDB);
app.services.redis2.connect();
app.services.redis2.select(config.redis2.selectDB);

module.exports = {
  eventEmitter,
  app,
  config
};

require('./Handlers/log/');



app.serve();




