import { ParsedUrlQuery } from "querystring";
import { Response } from 'express-serve-static-core';
import { convertToRoman } from "../service/numberConverter";
import { FailableResponse, RomanConversionRequest } from "./convertApiModel";

export const getRomanConversion = (query: ParsedUrlQuery): FailableResponse<string> => {
    const {mapQueryError, apiRequestModel} = mapQueryToRequestModel(query);
    if (mapQueryError !== undefined) {
        return {error: {code: 400, errorDescription: mapQueryError}};
    }
    return romanConvert(apiRequestModel!);
}

export const mapQueryToRequestModel = (query: ParsedUrlQuery): {mapQueryError?: string, apiRequestModel?: RomanConversionRequest} => {
    if (query.input === undefined) {
        return {mapQueryError: 'You must provide a number'};
    }
    if (Array.isArray(query.input)) {
        return {mapQueryError: 'You must provide only one number'};
    }
    return {apiRequestModel: {input: query.input}}
}

export const romanConvert = (request: RomanConversionRequest): FailableResponse<string> => {
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