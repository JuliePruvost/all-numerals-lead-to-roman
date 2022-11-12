import { convertToRoman } from "./numberConverter";

describe('convertToRoman', () => {

    it('should return error if number is invalid', () => {
        expect(convertToRoman(1.2).error).toBeDefined();
        expect(convertToRoman(0).error).toBeDefined();
        expect(convertToRoman(-10).error).toBeDefined();
        expect(convertToRoman(101).error).toBeDefined();
    })

    it('should return base roman character if equals to a base roman character', () => {
        expect(convertToRoman(1).result).toBe('I');
        expect(convertToRoman(5).result).toBe('V');
        expect(convertToRoman(10).result).toBe('X');
        expect(convertToRoman(50).result).toBe('L');
        expect(convertToRoman(100).result).toBe('C');
    });

    it('should return roman value for complex numbers', () => {
        expect(convertToRoman(19).result).toBe('XIX');
        expect(convertToRoman(39).result).toBe('XXXIX');
        expect(convertToRoman(74).result).toBe('LXXIV');
        expect(convertToRoman(98).result).toBe('XCVIII');
    });
});
