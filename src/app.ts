import express, { Express } from 'express';
import dotenv from 'dotenv';
import url from 'url';
import * as convertApi from './api/convertApi';
import events from 'events';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const convertResultSubject = 'newConvertResult';
const convertResultEmitter = new events.EventEmitter();

app.get('/', (_request, response) => {
    response.sendFile(`${__dirname}/page/index.html`);
})

app.get('/indexScript.js', (_request, response) => {
    response.sendFile(`${__dirname}/page/indexScript.js`);
})

app.get('/convert/roman', (request, response) => {
    const headers = {
        'Cache-Control': 'no-cache'
    };
    response.writeHead(200, headers);
    response.send();

    const query = url.parse(request.url, true).query;
    const {error, responseData} = convertApi.getRomanConversion(query);
    const data = error ? error.errorDescription : responseData
    convertResultEmitter.emit(convertResultSubject, data)
})

// events are broadcasted: all clients will receive conversion result messages
app.get('/events', (request, response) => {
    console.log(`A client has subscribed to events`);

    const headers = {
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive',
        'Cache-Control': 'no-cache'
    };
    response.writeHead(200, headers);
    response.flushHeaders();

    const eventHandler = (data: string) => {
        response.write(`data: ${data}\n\n`);
    }
    convertResultEmitter.on(convertResultSubject, eventHandler)

    request.on('close', () => {
        console.log(`A client closed a subscribtion to events`);
        convertResultEmitter.off(convertResultSubject, eventHandler);
        response.end();
    });
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}...`);
});