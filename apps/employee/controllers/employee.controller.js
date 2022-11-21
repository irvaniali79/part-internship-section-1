const employeeRepository = require('../repositories/employeeRepository');

async function add(req,res){
  const {id,data,parent} = req.body;
  await employeeRepository.insert({id,data,parentId:parent});
  res.response(JSON.stringify({
    status:'success',
    message:'you data cached successfully'

  }));
}

async function get(){
  
}

async function edit(req,res){
  const {id,data,parent} = req.body;
  await employeeRepository.update({id,data,parentId:parent});
  res.response(JSON.stringify({
    status:'success',
    message:'you data changed successfully'

  }));
}

module.exports = {
  add,
  get,
  edit

};