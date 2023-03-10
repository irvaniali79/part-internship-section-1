const { app } = require('../../..');
const notExistsError = require('../errorexceptions/notExistsError');
const uniquenessError = require('../errorexceptions/uniquenessError');
const { concatStrWithNum } = require('../utils/helper');
/**
 * @module
 */

/**
 * insert parent employee
 * @param {{id:string,data:object}} data to insert on db includes of id as key and data as value
 * @returns {Object} returns inserted parent 
 */
async function insertParent({id,data}){
  try {
    const parentId = concatStrWithNum('parent:',id);
    const parentExists = await app.services.userData.exists(parentId);
    if(parentExists)throw new uniquenessError('parent');
    const [,parentData] = await app.services.userData
      .multi()
      .set(parentId,JSON.stringify(data))
      .get(parentId)
      .exec();
    return {
      id,
      ...JSON.parse(parentData),
    };
  }
  catch (error) {
    if (error.type != 'uniqueness' && error.type != 'existence'){
      error.type = 'database';
    }
    throw error;
  }
  
}
/**
 * insert simple employee
 * @param {{id:string,data:object,parentId:string}} data to insert on db include of id as key and data as value
 * @returns {Object} returns inserted employee 
 */
async function insert({id,data,parentId}){
  try {
    const userId = concatStrWithNum(`user:${parentId}:`,id);
    const pId = concatStrWithNum('parent:',parentId);
    const [userExists,parentExists] = await Promise.all([
      app.services.userData.exists(userId),
      app.services.userData.exists(pId)
    ]);
    
    if(userExists)throw new uniquenessError('user');
    if(!parentExists)throw new notExistsError('parent');

    const [[,_data],] = await Promise.all([
      app.services.userData.multi().set(userId, JSON.stringify(data)).get(userId).exec(),
      app.services.userParent.set(userId, parentId)
    ]);

    return {
      id,
      parent:parentId,
      ...JSON.parse(_data)
    };
    
  }
  catch (error) {
    if (error.type != 'uniqueness' && error.type != 'existence'){
      error.type = 'database';
    }
    throw error;
  }
}
/**
 * fetch parent employee
 * @param {{id:string}} id parent identifier
 * @returns {Object} returns requested parent 
 */
async function fetchParent({id}){
  try {
    const pId = concatStrWithNum('parent:',id);

    const parentExists = await app.services.userData.exists(pId);
    if(!parentExists)throw new notExistsError('parent');

    const [data] = await Promise.all([
      app.services.userData.get(pId),
    ]);
    return {
      id,
      ...JSON.parse(data),
    };
  }
  catch (error) {
    if (error.type != 'existence'){
      error.type = 'database';
    }
    throw error;
  }
}
/**
 * update parent employee
 * @param {{id:string,data:object,parentId:string}} id parent identifier
 * @returns {Object} returns updated parent 
 */
async function updateParent({id,data}){
  const pId = concatStrWithNum('parent:',id);
  const parentExists = await app.services.userData.exists(pId);
  if(!parentExists)throw new notExistsError('parent');
  const userBeforeUpdate = await app.services.userData.get(pId);
  
  const [,updatedUser] = await app.services.userData
    .multi()
    .set(pId,JSON.stringify({
      ...JSON.parse(userBeforeUpdate),
      ...data
    }))
    .get(pId)
    .exec();

  return {
    id,
    ...JSON.parse(updatedUser)
  };
}


/**
 * delete parent employee using id
 * @param {{id:string}} id to delete specific employee using its id
 */
async function del({id}){
  try {
    const parentId = concatStrWithNum('parent:',id);
    const [userDeleted] = await Promise.all([
      await app.services.userData.exists(parentId),
    ]);
    if (!(userDeleted))throw new notExistsError('parent');
    await Promise.all([
      await app.services.userData.del(parentId),
    ]);
  }
  catch (error) {
    if(error.type != 'existence') {
      error.type = 'database';
    }
    throw error;
  }

}
/**
 * get related employees for this specific parent
 * @param {{id:string}} id parent identifier
 * @returns {Array<Object>} returns list of employees 
 */
async function fetchEmployeesOf({id}){
  const parentId = concatStrWithNum('parent:',id);
  try {
    const parentIsExists = await app.services.userData.exists(parentId);
    if(!parentIsExists)throw new notExistsError('parent');

    const users = await app.services.userParent.sendCommand(['KEYS','*']);

    const employeeIdList = [];
    for (const userId of users) {
      let pId = await app.services.userParent.get(userId);
      pId = concatStrWithNum('parent:',pId);
      if(pId==parentId)employeeIdList.push(userId);
    }
   

    let transaction = app.services.userData.multi();
    
    employeeIdList.forEach(id => {
      transaction = transaction.get(id);
    });

    let employeeList = await transaction.exec();
    employeeList.forEach((employee,index)=>{
      employeeList[index] = JSON.parse(employee);
    });

    return employeeList;
  }
  catch (error) {
    if(error.type != 'existence') {
      error.type = 'database';
    }
    throw error;
  }
}

module.exports = {
  insertParent,
  insert,
  fetchParent,
  updateParent,
  del,
  fetchEmployeesOf
};