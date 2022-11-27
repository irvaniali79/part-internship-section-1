async function getEmployeeRequest(req, res) {
  try {
    Number(req.routerParams[0]);
    if(req.routerParams[0]=='')throw Error('id is require field');
    return req;
  }
  catch (e) {
    e.type = 'bad input';
    throw e;
  }
}

module.exports = getEmployeeRequest;
