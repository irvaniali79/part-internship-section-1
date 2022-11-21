const {app} = require('../..');
const employeeController = require('./controllers/employee.controller');
const middlewares = require('../../middlewares');

    
app.router.addRoute('/dataService',employeeController.add,'POST').middleware([middlewares.fetchFromBody]);
app.router.addRoute('/dataService',employeeController.get,'GET');
app.router.addRoute('/dataService',employeeController.edit,'PUT').middleware([middlewares.fetchFromBody]);


  
