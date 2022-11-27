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
  required:['id','data'],
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
    throw e;
  }
}

module.exports = editEmployeeRequest;
