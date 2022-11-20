const { app } = require("../../..");

async function insert({id,data}){
    try {
        await app.db.insert({
            id,parentId
        },[id,data])
        await app.redis.set(id,data);

    } catch (error) {
        error.code = "database";
        
        throw error;
    }
}


module.exports = {
    insert
}