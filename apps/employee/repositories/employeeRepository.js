const { app } = require('../../..');

async function insert({id,data,parentId}){
  try {
    let result;
    await app.services.redis1.exists(id);
    if(!result){
      const e = new Error('user already exist');
      e.code = 'uniqueness';
      throw e;
    }
    await app.services.redis1.set(id,JSON.stringify(data));
    result = await app.services.redis2.exists(parentId);
    if(!result){
      const e = new Error('parent is not exists');
      e.code = 'existence';
      throw e;
    }
    await app.services.redis2.set(parentId,`-${id}`);

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
    const parentId = ;
    return {
      id,
      data,
      parent:parentId
    };
    //parentId
  }
  catch (error) {
    error.code = 'database';
    error.message = 'your data is not exist or database connection is failed';
    throw error;
  }
}

async function signUp({parentId}){
  try {
    await app.services.redis2.set(parentId,'-');
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
      await app.services.redis1.set(id,data)
      return 
    }
    const e = new Error('user is not exist');
    e.code = 'uniqueness';
    throw e;
  } catch (error) {
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
  update,
  signUp
};