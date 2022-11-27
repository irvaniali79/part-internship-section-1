const { app } = require('../../..');
const notExistsError = require('../errorexceptions/notExistsError');
const uniquenessError = require('../errorexceptions/uniquenessError');
const { concatStrWithNum } = require('../utils/helper');

async function insertParent({id,data}){
  const parentId = concatStrWithNum('parent:',id);
  const parentExists = await app.services.userData.exists(parentId);
  if(parentExists)throw new uniquenessError('parent');
  const [,parentData] = await app.services.userData.multi().set(parentId,JSON.stringify(data)).get(parentId);
  return {
    id,
    ...JSON.parse(parentData),
  };
}

async function insert({id,data,parentId}){
  try {
    const userId = concatStrWithNum('user:',id);
    const pId = concatStrWithNum('parent:',parentId);
    const [userExists,parentExists] = await Promise.all([
      app.services.userData.exists(userId),
      app.services.userData.exists(pId)
    ]);
    
    if(userExists)throw new uniquenessError('user');
    if(!parentExists)throw new notExistsError('parent');

    const [[,_data],] = await Promise.all([
      app.services.userData.multi().set(userId, JSON.stringify(data)).get(userId).exec(),
      app.services.userParent.set(id, parentId)
    ]);

    return {
      id,
      parent:parentId,
      ...JSON.parse(_data)
    };
    
  }
  catch (error) {
    if (error.code != 'uniqueness' && error.code != 'existence'){
      error.code = 'database';
      error.message = 'database connection is failed';
    }
    throw error;
  }
}

async function fetch({id}){
  try {
    const userId = concatStrWithNum('user:',id);

    const userExists = await app.services.userData.exists(userId);
    if(!userExists)throw new notExistsError('user');

    const [data,parentId] = await Promise.all([
      app.services.userData.get(userId),
      app.services.userParent.get(id)
    ]);
    return {
      id,
      ...JSON.parse(data),
      parent:parentId
    };
  }
  catch (error) {
    if (error.code != 'existence'){
      error.code = 'database';
      error.message = 'database connection is failed';
    }
    throw error;
  }
}

async function update({id,data,parentId}){
  try {
    const userId = concatStrWithNum('user:',id);

    const [userExists,parentExists] = await Promise.all([
      app.services.userData.exists(userId),
      app.services.userParent.exists(id)
    ]);
    if(!userExists)throw new notExistsError('user');
    if(!parentExists)throw new notExistsError('parent');

    const pId = await app.services.userParent.get(id);
      

    if( pId != parentId ){
      const error = new Error('wrong parent id given');
      error.code = 'wrong-param';
      throw Error();
    }

    const [,result] = await app.services.userData
      .multi()
      .set(userId,JSON.stringify(data))
      .get(userId)
      .exec();
    
    return JSON.parse(result);
  }
  catch (error) {
    if (error.code != 'existence' && error.code != 'wrong-param'){
      error.code = 'database';
      error.message = 'database connection is failed';
    }
    throw error;
  }
}
module.exports = {
  insertParent,
  insert,
  fetch,
  update
};