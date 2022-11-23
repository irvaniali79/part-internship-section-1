const employeeRepository = require('../repositories/employeeRepository');

async function add(req,res){
  const {id,data,parent} = req.body;
  await employeeRepository.insert({id,data,parentId:parent});
  res.response(JSON.stringify({
    status:'success',
    message:'your data cached successfully'

  }));
}

async function get(req,res,queryParams){
  const result = await employeeRepository.fetch(queryParams[0]);
  res.response(JSON.stringify({
    status:'success',
    data:result
  }));
}

async function edit(req,res){
  const {id,data,parent} = req.body;
  await employeeRepository.update({id,data,parentId:parent});
  res.response(JSON.stringify({
    status:'success',
    message:'your data changed successfully'

  }));
}

module.exports = {
  add,
  get,
  edit

};