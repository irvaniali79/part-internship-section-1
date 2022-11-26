module.exports = class uniquenessError extends Error{
  constructor(msg){
    super();
    this.message = `${msg} already exist`;
    this.code = 'uniqueness';
  }
};