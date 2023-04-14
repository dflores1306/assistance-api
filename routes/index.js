const express = require('express');
const assistancesRouter = require('./assistances.router');

function routerApi(app){
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/assistances', assistancesRouter);
}

module.exports = routerApi;
