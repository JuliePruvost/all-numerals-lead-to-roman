
export type FailableResponse<T> = {error?: {code: number, errorDescription: string}, responseData?: T}

export type RomanConversionRequest = {
    input: string;
}


