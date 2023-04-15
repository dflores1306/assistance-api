const express = require('express');

const AssistanceService = require('./../services/assistance.service');
const validationsHandler = require('./../middlewares/validations.handler');
const { createAssistaceSchema, getAssistaceSchema, updateAssistaceSchema } = require('./../schemas/assistance.schema');

const router = express.Router();
const assistanceService = new AssistanceService();

router.get('', async (request, response) => {
  const { limit, offset } = request.query;

  if (limit && offset) {
    const assistances = await assistanceService.get(limit, offset);
    response.status(200).json(assistances);
  } else {
    const assistances = await assistanceService.get('', '');
    response.status(200).json(assistances);
  }
});

router.get('/filter', async (request, response) =>{
  response.json([
    {
      userId: '0001',
      userName: 'AAA',
      date: '2023-01-01',
      punchIn: '09:00 AM',
      punchOut: '06:00 PM'
    },
    {
      userId: '0002',
      userName: 'BBB',
      date: '2023-01-01',
      punchIn: '09:00 AM',
      punchOut: '06:00 PM'
    }
  ]);
});

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
