function corsWrapper(config){
  return function cors(req,res,next){
    if(req.method.toUpperCase()=='OPTIONS'){
      res.setHeader('Access-Control-Allow-Origin',config.origin);
      res.setHeader('Access-Control-Allow-Methods', '*');
      res.setHeader('Access-Control-Allow-Credentials', 'true');
      res.setHeader('Vary','Origin');
      const e = new Error('option request');
      e.code = 204;
      next(e);
      return;
    }
    if((req.headers?.origin || undefined) != config.origin){
      const e = new Error('cors');
      e.code = 403;
      next(e);
      return;
    }
    res.setHeader('Access-Control-Allow-Origin',config.origin);
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Vary','Origin');
    next();  
    return;   
  };
          
}

     
  



module.exports = corsWrapper;
