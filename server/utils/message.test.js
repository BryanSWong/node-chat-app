let expect = require('expect');

let {generateMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        // store res in variable

        let from = "somedude";
        let text = "Hello all!";

        let test = generateMessage(from, text);
        // assert from match
        expect(test.from).toBe(from);
        // assert text match
        expect(test.text).toBe(text);
        // assert createdAt match using .toBeA()
        expect(test.createdAt).toBeA('number');
    });
});