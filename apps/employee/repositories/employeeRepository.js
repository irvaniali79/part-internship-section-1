const { app } = require('../../..');
const notExistsError = require('../errorexceptions/notExistsError');
const uniquenessError = require('../errorexceptions/uniquenessError');

async function insert({id,data,parentId}){
  try {
    let result;
    
    if (parentId != undefined){
      result = await app.services.redis1.exists('parent:'+id);
      if(!result){
        throw new uniquenessError();
      }
      await app.services.redis1.set('parent:'+id,JSON.stringify(data));
      return 'data stored successfully';
    }

    result = await app.services.redis1.exists('user:'+id);
    if(!result){
      throw new uniquenessError();
    }
    result = await app.services.redis1.exists('parent:'+parentId);
    if(!result){
      throw new notExistsError('parent');
    }

    await app.services.redis2.set(id, parentId);
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
    const data = await app.services.redis1.get(id);
    const parentId = await app.services.redis2.get(id);
    return {
      id,
      data,
      parent:parentId
    };
  }
  catch (error) {
    error.code = 'database';
    error.message = 'your data is not exist or database connection is failed';
    throw error;
  }
}


async function update({id,data}){
  try {
    let result = await app.services.redis1.exists(id);
    if(result){
      await app.services.redis1.set(id,data);
      return; 
    }
    const e = new Error('user is not exist');
    e.code = 'uniqueness';
    throw e;
  }
  catch (error) {
    if (error.code != 'uniqueness'){
      error.code = 'database';
      error.message = 'database connection is failed';
    }
    throw error;
  }
}
module.exports = {
  insert,
  fetch,
  update
};