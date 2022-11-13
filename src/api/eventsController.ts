import { convertResultEmitter, convertResultSubject } from "./convertController";
import express from 'express';

var router = express.Router();

// Events are broadcasted: all clients will receive conversion result messages
// If we want events not to be broadcasted, a solution could be to send an uid on the event route.
// Then for each convert request, the client would have to provide the uid.
// The server would be able to send the response only to the specific client.
router.get('/', (request, response) => {
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

export default router;
