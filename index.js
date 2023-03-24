const express = require('express');
const path = require('path');
const moment = require('moment');
const members = require('./Members');

const app = express();
    
const logger = (req, res, next) => { // logger middleware. next is a callback that moves on to the next middleware in the stack
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}`); // http :// localhost:5000 /api/members
    next();
}
app.use(logger); // use the logger middleware

// app.get('/', (req, res) => {
//     console.log('Get Request');
//     // res.send('<h1>Hello World</h1>');
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// })
    
app.get('/api/members', (req,res) => { // rest API - get
    res.json(members); // sends the members array as a json object
});


app.use(express.static(path.join(__dirname, 'public'))); // gets the current directory and joins it with the public folder to set the static path as the public folder

const PORT = 5000 || process.env.PORT;
app.listen(PORT, () => {
    `Server started on port ${PORT}`
});