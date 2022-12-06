const { app } = require('../../..');
const notExistsError = require('../errorexceptions/notExistsError');
const uniquenessError = require('../errorexceptions/uniquenessError');
const notMatchError = require('../errorexceptions/notMatchError');
const { concatStrWithNum } = require('../utils/helper');

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
    if (error.type != 'uniqueness' && error.type != 'existence'){
      error.type = 'database';
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
    if (error.type != 'existence'){
      error.type = 'database';
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
    if( pId != parentId )throw new notMatchError('parentId');

    const userBeforeUpdate = await app.services.userData.get(userId);
    const [,updatedUser] = await app.services.userData
      .multi()
      .set(userId,JSON.stringify({
        ...JSON.parse(userBeforeUpdate),
        ...data
      }))
      .get(userId)
      .exec();
    
    return {
      id,
      parent:parentId,
      ...JSON.parse(updatedUser)
    };

  }
  catch (error) {
    if (error.type != 'existence' && error.type != 'notMatched'){
      error.type = 'database';
    }
    throw error;
  }
}


async function del({id}){
  try {
    const userId = concatStrWithNum('user:',id);
    const [userDeleted,relationDeleted] = await Promise.all([
      await app.services.userData.exists(userId),
      await app.services.userParent.exists(id)
    ]);
    if (!(userDeleted||relationDeleted))throw new notExistsError('user or relation for user');
    await Promise.all([
      await app.services.userData.del(userId),
      await app.services.userParent.del(id)
    ]);
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
  fetch,
  update,
  del
};