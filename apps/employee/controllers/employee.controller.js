const employeeRepository = require('../repositories/employee.repository');
/**
 * @module
 */
/**
 * add employee controller
 * @param {Object|http.IncomingRequest} req node incoming request object
 * @param {Object|http.ServerResponse} res node server response object 
 * @returns {void} response inserted user's information in an object with status 201
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
 * @returns {void} response employee's information as an object with status 200
 */
async function get(req,res,queryParams){
  const user = await employeeRepository.fetchParent({id:queryParams['id']});
  res.response(JSON.stringify(user));
}
/**
 * edit employee function 
 * @param {Object|http.IncomingRequest} req node incoming request object
 * @param {Object|http.ServerResponse} res node server response object 
 * @returns {void} response edited employee's information as an object with status 200
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
 * @returns {void} response null with status code 204
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
 * @returns {void} response list of employees in an object with status 200
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