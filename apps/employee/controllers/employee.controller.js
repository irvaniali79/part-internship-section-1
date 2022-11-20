const employeeRepository = require("../repositories/employeeRepository");

async function addEmployee(req,res,queryParams){

  employeeRepository.insert(req);
}

async function getEmployee(req,res,queryParams){
  
}



module.exports = {
  addEmployee,
  getEmployee
};