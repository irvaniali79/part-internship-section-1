module.exports = {
  responseResolver(res,headerObject={ 'Content-Type': 'application/json' }){
    res.writeHead(res.status?res.status:200, headerObject);
    res.end(res.response);
  }
}; 