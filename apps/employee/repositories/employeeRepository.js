const { app } = require('../../..');
const notExistsError = require('../errorexceptions/notExistsError');
const uniquenessError = require('../errorexceptions/uniquenessError');

async function insert({id,data,parentId}){
  try {
    let result;
    
    if (parentId == undefined){
      result = await app.services.redis1.exists('parent:'+id);
      if(result){
        throw new uniquenessError('parent');
      }
      await app.services.redis1.set('parent:'+id,JSON.stringify(data));
      return 'data stored successfully';
    }

    result = await app.services.redis1.exists('user:'+id);
    if(result){
      throw new uniquenessError('user');
    }
    result = await app.services.redis1.exists('parent:'+parentId);
    if(!result){
      throw new notExistsError('parent');
    }
    await app.services.redis1.set('user:'+id, JSON.stringify(data));
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
    let result;
    result = await app.services.redis1.exists('user:'+id);
    if(!result){
      throw new notExistsError('user');
    }
    const data = await app.services.redis1.get('user:'+id);
    const parentId = await app.services.redis2.get(id);
    return {
      id,
      data:JSON.parse(data),
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
    let result;
    result = await app.services.redis1.exists('user:'+id);
    if(!result){
      throw new notExistsError('user');
    }
    result = await app.services.redis2.exists(id);
    if(!result){
      throw new notExistsError('user');
    }
    const pId = await app.services.redis2.get(id);
    if( pId != parentId ){
      const error = new Error('wrong parent id given');
      error.code = 'wrong-param';
      throw Error();
    }
    let tmp;
    [tmp,result] = await app.services.redis1
      .multi()
      .set('user:'+id,JSON.stringify(data))
      .get('user:'+id)
      .exec();
    
    return JSON.parse(result);
  }
  catch (error) {
    if (error.code != 'uniqueness' && error.code != 'wrong-param'){
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