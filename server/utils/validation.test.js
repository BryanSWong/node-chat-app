const expect = require('expect');

const {isRealString} = require('./validation');


describe('isRealString', () => {
    it('should reject non string values', () => {
        let nonString = isRealString(1234356);
        expect(nonString).toBeFalsy();
    });

    it('should reject strings with only spaces', () => {
        let spacesTest = isRealString('                ');
        expect(spacesTest).toBeFalsy();
    });

    it('should allow string with non-space characters', () => {
        let stringTest = isRealString('    imallbunchedtogether');
        expect(stringTest).toBeTruthy();
    });
});