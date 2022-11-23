module.exports = class notExistsError extends Error{
  constructor(message){
    super();
    this.message = `${message}  is not exists`;
    this.code = 'existence';
  }
};