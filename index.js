const express = require('express');
const routerApi = require('./routes');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');

app.use(express.json());

const whiteList = ["https://dflores1306.github.io/", "http://localhost:4200"];
const settings = {
  origin: (origin, callback) =>{
    if (whiteList.includes(origin) || !origin){
      callback(null, true);
    } else {
      callback(new Error('Not Allowed'));
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE"
}
app.use(cors(settings));

app.get('/', (request, response) => {
  response.send('Assistance API');
});

routerApi(app);
app.use(logErrors);
app.use(boomErrorHandler)
app.use(errorHandler);

app.listen(port, () => { });

