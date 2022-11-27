const Ajv = require('ajv');
const ajv = new Ajv({ allErrors: true });

const editEmpSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
    },
    data: {
      type: 'object',
    },
    parent: {
      type: 'string',
    }
  },
  required:['id','data','parent'],
  additionalProperties: false,
};

async function editEmployeeRequest(req, res, next) {
  try {

    const validReq = ajv.validate(editEmpSchema, req.body);

    if (!validReq)
      throw new Error(JSON.stringify(ajv.errors));
    return req;
  }
  catch (e) {
    e.code = 400;
    e.message = JSON.parse(e.message);
    throw e;
  }
}

module.exports = editEmployeeRequest;
