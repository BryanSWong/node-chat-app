let expect = require('expect');

let {generateMessage} = require('./message');
let {generateLocationMessage} = require('./message');

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

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        let from = 'Admin';
        let latitude = 98760;
        let longitude = 32420;

        let test = generateLocationMessage(from, latitude, longitude);

        expect(test.from).toBe('Admin');
        expect(test.url).toBe('https://www.google.com/maps?q=98760,32420');
        expect(test.createdAt).toBeA('number');
    });
});