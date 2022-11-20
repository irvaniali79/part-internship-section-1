const {app} = require('../..');
const employeeController = require('./controllers/employee.controller');
const middlewares = require('../../middlewares');

app.router.group('users',()=>{
    
    app.router.addRoute('/dataService',employeeController.addEmployee,'POST').middleware([middlewares.fetchFromBody]);
    app.router.addRoute('/dataService/@',employeeController.getEmployee,'GET');

  

})