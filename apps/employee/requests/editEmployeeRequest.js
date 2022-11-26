const Ajv = require("ajv");
const ajv = new Ajv({ allErrors: true });

const editEmpSchema = {
  type: "object",
  properties: {
    id: {
      type: "string",
    },
    data: {
      type: "object",
      properties: {

      }
    },
    parent: {
      type: "string",
    }
  },
  required:['id','data'],
  additionalProperties: false,
};

async function editEmployeeRequest(req, res, next) {
  try {

    const validReq = ajv.validate(editEmpSchema, req.files);

    if (!validReq)
      throw new Error(JSON.stringify(ajv.errors));
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

module.exports = editEmployeeRequest;
