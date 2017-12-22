let moment = require('moment');

// let date = moment();
//
// date.add(100, 'years').subtract(9, 'months');
//
// console.log(date.format('MMM Do, YYYY'));

let createdAt = new Date().getTime();

let date = moment(createdAt);

console.log(date.format('h:mm a'));