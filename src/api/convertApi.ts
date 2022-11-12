import { ParsedUrlQuery } from "querystring";
import { Response } from 'express-serve-static-core';
import { convertToRoman } from "../service/numberConverter";
import { FailableResponse, RomanConversionRequest } from "./convertApiModel";

export const getRomanConversion = (query: ParsedUrlQuery, response: Response) => {
    const {mapQueryError, apiRequestModel} = mapQueryToRequestModel(query);
    if (mapQueryError !== undefined) {
        response.status(400).send(mapQueryError);
        return;
    }
    const {error, responseData} = romanConvert(apiRequestModel!);
    if (error !== undefined) {
        response.status(error.code).send(error.errorDescription);
    } else {
        response.status(200).send(responseData);
    }
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