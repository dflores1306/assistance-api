const express = require('express');

const AssistanceService = require('./../services/assistance.service');
const validationsHandler = require('./../middlewares/validations.handler');
const { createAssistaceSchema, getAssistaceSchema, updateAssistaceSchema, getQueryAssistaceSchema } = require('./../schemas/assistance.schema');

const router = express.Router();
const assistanceService = new AssistanceService();

router.get('/',
  validationsHandler(getQueryAssistaceSchema, 'query'),
  async (request, response, next) => {
    try {
      const assistances = await assistanceService.get(request.query);
      response.status(200).json(assistances);
    } catch (error) {
      next(error);
    }


  }
);

router.get('/:id', validationsHandler(getAssistaceSchema, 'params'), async (request, response, next) => {
  try {
    const id = request.params.id;
    const assistance = await assistanceService.getOne(id);
    response.status(200).json(assistance);
  } catch (error) {
    next(error);
  }
});

router.post('/', validationsHandler(createAssistaceSchema, 'body'), async (request, response) => {
  const body = request.body;
  const newAssistance = await assistanceService.add(body);
  response.status(201).json({
    newAssistance
  })
});

router.patch('/:id', validationsHandler(getAssistaceSchema, 'params'), validationsHandler(updateAssistaceSchema, 'body'), async (request, response, next) => {
  try {
    const { id } = request.params;
    const body = request.body;
    const assistace = await assistanceService.update(id, body);
    response.status(200).json(assistace);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', validationsHandler(getAssistaceSchema, 'params'), async (request, response, next) => {
  try {
    const { id } = request.params;
    const deleted = await assistanceService.delete(id);
    response.status(200).json({
      deleted: deleted,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
