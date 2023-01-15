const employeeRepository = require('../repositories/employee.repository');

/**
 * add employee controller
 * @param {Object|http.IncomingRequest} req node incoming request object
 * @param {Object|http.ServerResponse} res node server response object 
 */
async function add(req,res){
  const {id,data,parent} = req.body;
  let user;
  if (parent) user = await employeeRepository.insert({id,data,parentId:parent});
  else  user = await employeeRepository.insertParent({id,data});
  res.type('POST');
  res.response(JSON.stringify(user));
}
/**
 * get employee 
 * @param {Object|http.IncomingRequest} req node incoming request object
 * @param {Object|http.ServerResponse} res node server response object 
 * @param {Object} queryParams route params automatic will inject, include id
 */
async function get(req,res,queryParams){
  const user = await employeeRepository.fetchParent({id:queryParams['id']});
  res.response(JSON.stringify(user));
}
/**
 * edit employee function 
 * @param {Object|http.IncomingRequest} req node incoming request object
 * @param {Object|http.ServerResponse} res node server response object 
 */
async function edit(req,res){
  
  const {id,data} = req.body;
  const updatedUser = await employeeRepository.updateParent({id,data});

  res.response(JSON.stringify(updatedUser));
}
/**
 * delete specific employee
 * @param {Object|http.IncomingRequest} req node incoming request object
 * @param {Object|http.ServerResponse} res node server response object 
 * @param {Object} queryParams route params automatic will inject, include id
 */
async function del(req,res,queryParams){
  await employeeRepository.del({id:queryParams['id']});
  res.type('DELETE');
  res.response(JSON.stringify({}));
}
/**
 * get employees of specific parent
 * @param {Object|http.IncomingRequest} req node incoming request object
 * @param {Object|http.ServerResponse} res node server response object 
 * @param {Object} queryParams route params automatic will inject, include id
 */
async function getMyEmployees(req,res,queryParams){
  const myEmployees = await employeeRepository.fetchEmployeesOf({id:queryParams.id});
  res.response(JSON.stringify({
    users:myEmployees
  }));
}

module.exports = {
  add,
  get,
  edit,
  del,
  getMyEmployees
};