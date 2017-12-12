const path = require('path');
let express = require('express');

const publicPath = path.join(__dirname, '../public');

// console.log(__dirname + '/../public');
// console.log(publicPath);

let app = express();
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

// app.get('/', (req, res) => {
//     res.render('index.html');
// });

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = {app};