const { request, response } = require('express');
const express = require('express');

const router = express.Router();

router.get('', (request, response) => {
  const { limit, offset } = request.query;

  if (limit && offset) {
    response.json({
      limit,
      offset
    });
  } else {
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
  }
});

router.get('/filter', (request, response) =>{
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

router.get('/:id', (request, response) => {
  const id = request.params.id;
  if ( id === '999') {
    response.status(404).json(
      {
        message: 'Not found'
      });
  }else{
    response.status(200).json(
      {
        id,
        userId: '0002',
        userName: 'BBB',
        date: '2023-01-01',
        punchIn: '09:00 AM',
        punchOut: '06:00 PM'
      }
    );
  }

});

router.post('/', (request, response) => {
  const body = request.body;

  response.status(201).json({
    message: 'created',
    data: body
  })
});

router.patch('/:id', (request, response) => {
  const { id } = request.params;
  const body = request.body;

  response.json({
    message: 'update',
    data: body,
    id,
  })
});

router.delete('/:id', (request, response) => {
  const { id } = request.params;

  response.json({
    message: 'delete',
    id,
  })
});

module.exports = router;
