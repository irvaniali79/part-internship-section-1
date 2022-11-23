module.exports = class uniquenessError extends Error{
  constructor(){
    super();
    this.message = 'user already exist';
    this.code = 'uniqueness';
  }
};