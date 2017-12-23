const expect = require('expect');
const {Users}= require('./users');

describe('Users', () => {

    var users;

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id:'1',
            name: 'Mike',
            room: 'Node Course'
        }, {
            id:'2',
            name: 'jen',
            room: 'React Course'
        }, {
            id:'3',
            name: 'dude',
            room: 'Node Course'
        }];
    });

    it('should add new user', () => {
        let users = new Users();
        let user = {
            id:'123',
            name: 'Someguy',
            room: 'The game'
        };

        let resUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    });

    it('should return names for Node course', () => {
        let userList = users.getUserList('Node Course');
        expect(userList).toEqual(['Mike', 'dude']);
    });

    it('should return names for React course', () => {
        let userList = users.getUserList('React Course');
        expect(userList).toEqual(['jen']);
    });

    it('should remove a user', () =>{
        let userList = users.removeUser('2');
        expect(userList.id).toEqual(['2']);
        expect(users.users.length).toBe(2);
    });

    it('should not remove user', () => {
        let userList = users.removeUser('5');
        expect(userList).toEqual(undefined);
        expect(users.users.length).toBe(3);
    });

    it('should find a user', () => {
        let userList = users.getUser('1');
        expect(userList.id).toEqual('1');
    });

    it('should not find user', () => {
        let userList = users.getUser('5');
        expect(userList).toEqual(undefined);
    });

});