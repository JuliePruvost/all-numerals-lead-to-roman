import express, { Express } from 'express';
import dotenv from 'dotenv';
import url from 'url';
import * as convertApi from './api/convertApi';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get('/', (_request, response) => {
    response.sendFile(`${__dirname}/page/index.html`);
})

app.get('/indexScript.js', (_request, response) => {
    response.sendFile(`${__dirname}/page/indexScript.js`);
})

app.get('/convert/roman', (request, response) => {
    const query = url.parse(request.url, true).query;
    convertApi.getRomanConversion(query, response);
})

app.listen(port, () => {
    console.log(`Server is listening on port ${port}...`);
});