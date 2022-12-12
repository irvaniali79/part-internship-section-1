const {app} = require('../..');
const employeeController = require('./controllers/employee.controller');
const { addEmployeeRequest, getEmployeeRequest, editEmployeeRequest } = require('./requests');
    
app.router.addRoute('/dataService/',employeeController.add,'POST').middleware([addEmployeeRequest]);
app.router.addRoute('/dataService/@id/',employeeController.get,'GET').middleware([getEmployeeRequest]);
app.router.addRoute('/dataService/',employeeController.edit,'PUT').middleware([editEmployeeRequest]);

app.router.addRoute('/dataService/@id/employees',employeeController.getMyEmployees,'GET');

app.router.addRoute('/dataService/remove/@id/',employeeController.del,'DELETE');


  
