const Joi = require('joi');

const validateHeaders = (headers, schema) => {
  try {
    const joiHeadersResult = Joi.validate(
      headers, schema, { abortEarly: false },
    );
    if (joiHeadersResult.error) {
      throw new Error('JOI-MISSING-FIELDS');
    }
  } catch (error){
    return new Error(error)
  }
};

const validateParams = (params, schema) => {
  try {
    const joiHeadersResult = Joi.validate(
      params, schema, { abortEarly: false },
    );


    if (joiHeadersResult.error) {
      throw new Error('JOI-MISSING-FIELDS');
    }
} catch (error){
  return new Error(error)
}
};

const validateBody = (body, schema) => {
  const joiBodyResult = Joi.validate(
    body, schema, { abortEarly: false },
  );
  if (joiBodyResult.error) {
    const errors = joiBodyResult.error.details.map(error => ({ mensagem: error.message }));
    return errors;
  }

  return false;
};

module.exports = {
  validateHeaders,
  validateParams,
  validateBody,
};
