module.exports = {
  'image/svg':{
    status:400,
    headers:(res)=>{
      return {
        'Content-Type':res.type
      };
    }
  },
  'POST':{
    status:'201'
  },
  'DELETE':{
    status:'204'
  }
};