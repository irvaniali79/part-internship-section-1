module.exports = class uniquenessError extends Error{
  constructor(msg){
    super();
    this.message = `${msg} already exist`;
    this.type = 'uniqueness';
    this.code = 403;
    this.metaCode = 'UNIQUENESS';
  }
};