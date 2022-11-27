module.exports = {
  responseResolver(res,headerObject={ 'Content-Type': 'application/json' }){
    res.writeHead(res.status, headerObject);
    res.end(res.response);
  }
}; 