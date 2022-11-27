module.exports = class notExistsError extends Error{
  constructor(message){
    super();
    this.message = `${message}  is not exists`;
    this.type = 'existence';
    this.code = 403;
  }
};