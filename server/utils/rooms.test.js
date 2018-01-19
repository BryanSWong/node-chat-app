const expect = require('expect');
const {Rooms}= require('./rooms');

describe('Rooms', () => {

    it('Should add a new room', () => {
        let rooms = new Rooms();
        let room = "test";
        let roomAdded = rooms.addRoom(room);

        expect(roomAdded).toEqual([room]);
    });



});