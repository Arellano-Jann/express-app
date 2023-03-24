const express = require('express');
const path = require('path');
const members = require('./Members');
const logger = require('./middleware/logger');

const app = express();
    
app.use(logger); // use the logger middleware

// app.get('/', (req, res) => {
//     console.log('Get Request');
//     // res.send('<h1>Hello World</h1>');
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// })
    
app.get('/api/members', (req,res) => { // rest API - get
    res.json(members); // sends the members array as a json object
});

app.get('/api/members/:id', (req, res) => {
    // res.send(req.params.id); // sends the id parameter
    res.json(members.filter((member) => member.id === parseInt(req.params.id))); // parseInt turns the string into an int because member.id is a number. === means both types have to be the same
})


app.use(express.static(path.join(__dirname, 'public'))); // gets the current directory and joins it with the public folder to set the static path as the public folder

const PORT = 5000 || process.env.PORT;
app.listen(PORT, () => {
    `Server started on port ${PORT}`
});