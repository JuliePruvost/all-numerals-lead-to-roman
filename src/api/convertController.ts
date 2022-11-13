import { ParsedUrlQuery } from "querystring";
import { convertToRoman } from "../service/numberConverter";
import { FailableResponse, RomanConversionRequest } from "./convertControllerModel";
import url from 'url';
import events from 'events';
import express from 'express';

var router = express.Router();

export const convertResultEmitter = new events.EventEmitter();
export const convertResultSubject = 'newConvertResult';

router.get('/roman', (request, response) => {
    const headers = {
        'Cache-Control': 'no-cache'
    };
    response.writeHead(200, headers);
    response.send();

    const query = url.parse(request.url, true).query;
    const {error, responseData} = getRomanConversion(query);
    const data = error ? error.errorDescription : responseData
    convertResultEmitter.emit(convertResultSubject, data)
})

const getRomanConversion = (query: ParsedUrlQuery): FailableResponse<string> => {
    const {mapQueryError, apiRequestModel} = mapQueryToRequestModel(query);
    if (mapQueryError !== undefined) {
        return {error: {code: 400, errorDescription: mapQueryError}};
    }
    return romanConvert(apiRequestModel!);
}

const mapQueryToRequestModel = (query: ParsedUrlQuery): {mapQueryError?: string, apiRequestModel?: RomanConversionRequest} => {
    if (query.input === undefined) {
        return {mapQueryError: 'You must provide a number'};
    }
    if (Array.isArray(query.input)) {
        return {mapQueryError: 'You must provide only one number'};
    }
    return {apiRequestModel: {input: query.input}}
}

const romanConvert = (request: RomanConversionRequest): FailableResponse<string> => {
    const input = request.input;
    const number = parseFloat(input);    

    if (number === NaN) {
        return {error: {code: 400, errorDescription: 'input is not a number'}};
    }
    const {error, result} = convertToRoman(number);
    if (error !== undefined) {
        return {error: {code: 400, errorDescription: error}};
    }
    return {responseData: result};
}

export default router;
