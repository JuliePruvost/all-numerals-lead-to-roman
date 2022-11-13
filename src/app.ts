import express, { Express } from 'express';
import dotenv from 'dotenv';
import frontEndController from './api/frontEndController';
import eventsController from './api/eventsController';
import convertController from './api/convertController';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

// middleware to log incoming requests
app.use(function logRequest(req, _res, next) {
  console.log(`Incoming request ${req.path} at ${new Date().toLocaleString()}`);
  next();
});

app.use('/', frontEndController);
app.use('/convert', convertController);
app.use('/events', eventsController);

app.listen(port, () => {
    console.log(`Server is listening on port ${port}...`);
});