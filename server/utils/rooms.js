class Rooms {
    constructor(){
        this.rooms = [];
    }

    addRoom (room) {
        this.room = room;
        this.rooms.push(room);
        return room;
    }

    removeRoom (room) {
        this.room = room;

        if(room){
            this.rooms = this.rooms.filter()
        }
    }

}

module.exports = {Rooms};