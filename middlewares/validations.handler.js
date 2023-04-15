const { response } = require("express");
const boom = require('@hapi/boom');

function validationsHandler (schema, property){
  return (request, response, next ) => {
    const data = request[property];
    const { error } = schema.validate(data);
    if (error) {
      next(boom.badRequest(error));
    }else{
      next();
    }
  }
}

module.exports = validationsHandler;
