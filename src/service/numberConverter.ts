
// note: algo written here is not the usual generic algo you can find on internet.
// this one is more basic, as it works only with numbers up to 100
export const convertToRoman = (number: number): {error?: string, result: string} => {
    if (Number.isInteger(number) === false) {
        return {error: 'number should be an integer', result: ''}
    }
    if (number === 0) {
        return {error: '0 does not exist as a roman number', result: ''}
    }
    if (number <= 0 || number >100) {
        return {error: 'number should be strictly greater than 0 and smaller than 100', result: ''}
    }
    if (number === 100) {
        return {result: 'C'};
    }

    const units = number % 10;
    const tens = Math.floor(number / 10);
    return {result: `${convertTensToRoman(tens)}${convertUnitsToRoman(units)}`};
}

// accepts a number from 0 to 9
const convertTensToRoman = (tens: number) => {
    switch(tens) {
        case 0: return '';
        case 1: return 'X';
        case 2: return 'XX';
        case 3: return 'XXX';
        case 4: return 'XL';
        case 5: return 'L';
        case 6: return 'LX';
        case 7: return 'LXX';
        case 8: return 'LXXX';
        case 9: return 'XC';
        default: throw Error('argument out of range')
    }
}

// accepts a number from 0 to 9
const convertUnitsToRoman = (tens: number) => {
    switch(tens) {
        case 0: return '';
        case 1: return 'I';
        case 2: return 'II';
        case 3: return 'III';
        case 4: return 'IV';
        case 5: return 'V';
        case 6: return 'VI';
        case 7: return 'VII';
        case 8: return 'VIII';
        case 9: return 'IX';
        default: throw Error('argument out of range')
    }
}