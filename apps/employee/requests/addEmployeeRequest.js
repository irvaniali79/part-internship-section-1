const Ajv = require('ajv');
const ajv = new Ajv({ allErrors: true });

const addEmpSchema = {
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

async function addEmployeeRequest(req, res, next) {
  try {

    const validReq = ajv.validate(addEmpSchema, req.body);

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

module.exports = addEmployeeRequest;
