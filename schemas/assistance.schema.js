const Joi = require('joi');

const id = Joi.number().integer();
const userId = Joi.string().alphanum().min(1).max(30);
const userName = Joi.string().min(3).max(30);
const date = Joi.date().iso();
const punchIn = Joi.string().min(1).max(10);
const punchOut = Joi.string().min(1).max(10);

const offset = Joi.number().integer();
const limit = Joi.number().integer();

const filterName = Joi.string().min(3).max(30);
const minDate = Joi.date().iso();
const maxDate = Joi.date().iso();

const createAssistaceSchema = Joi.object({
  userId: Joi.string().alphanum().min(1).max(30).required(),
  userName: Joi.string().min(3).max(30).required(),
  date: Joi.date().iso().required(),
  punchIn: Joi.string().min(1).max(10).required(),
  punchOut: Joi.string().min(1).max(10).required(),
});

const updateAssistaceSchema = Joi.object({
  id: id,
  userId: userId,
  userName: userName,
  date: date,
  punchIn: punchIn,
  punchOut: punchOut
});

const getAssistaceSchema = Joi.object({
  id: id.required(),
});

const getQueryAssistaceSchema = Joi.object({
  limit,
  offset,
  filterName,
  minDate,
  maxDate
});


module.exports = { createAssistaceSchema, getAssistaceSchema, updateAssistaceSchema, getQueryAssistaceSchema }
