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
  const {type} = req.querystring || {type:'employee'};
  let user;
  if(type=='parent')user = await employeeRepository.fetchParent({id:queryParams['id']});
  else user = await employeeRepository.fetchEmployee({id:queryParams['id']});
  res.response(JSON.stringify(user));
}

async function edit(req,res){
  
  const {id,data,parent} = req.body;
  let updatedUser;
  if(!parent) updatedUser = await employeeRepository.updateParent({id,data});
  else updatedUser = await employeeRepository.updateEmployee({id,data,parentId:parent});

  res.response(JSON.stringify(updatedUser));
}

async function del(req,res,queryParams){
  await employeeRepository.del({id:queryParams['id']});
  res.type('DELETE');
  res.response(JSON.stringify({}));
}

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