module.exports = {
  '404':{
    code:404,
    message:'Page not found',
    level:'',
    metaCode:'NOTFOUND'
  },
  '401':{
    code:401,
    message:'Unauthorize request',
    level:'',
    metaCode:'UNAUTHORIZE'
  },
  '429':{
    code:429,
    message:'To many requests',
    level:'',
    metaCode:'TOMANYREQUEST'
  },
  '500':{
    code:500,
    message:'Server internal error',
    level:'',
    metaCode:'SERVERINTERNAL'
  },
  'database':{
    code:502,
    message:'Bad gateway',
    level:'',
    metaCode:'BADGATEWAY'
  },
  'bad input':{
    code:400,
    message:'Id is required field',
    level:'',
    metaCode:'IDREQUIRED'
  },
  'wrong-parameter':{
    code:403,
    message:'parameter is wrong',
    level:'',
    metaCode:'WRONGPARAMS'
  }
};