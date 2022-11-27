const employeeRepository = require('../repositories/employee.repository');

async function add(req,res){
  const {id,data,parent} = req.body;
  let user;
  if (parent) user = await employeeRepository.insert({id,data,parentId:parent});
  else  user = await employeeRepository.insertParent({id,data});
  res.type('POST');
  res.response(JSON.stringify(user));
}

async function get(req,res,queryParams){
  const user = await employeeRepository.fetch({id:queryParams['id']});
  res.response(JSON.stringify(user));
}

async function edit(req,res){
  const {id,data,parent} = req.body;
  const updatedUser = await employeeRepository.update({id,data,parentId:parent});
  res.response(JSON.stringify(updatedUser));
}

module.exports = {
  add,
  get,
  edit
};