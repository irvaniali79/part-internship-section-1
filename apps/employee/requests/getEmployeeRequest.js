async function getEmployeeRequest(req, res, next) {
  try {

    let isNumber = Number(req.routerParams[0])
    return req;
  } catch (e) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: "oops! Something went wrong!",
        addtionalInfo: JSON.parse(e.message),
      })
    );
  }
}

module.exports = getEmployeeRequest;
