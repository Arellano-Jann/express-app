const express = require('express');
const path = require('path');
const logger = require('./middleware/logger');

const app = express();
    
app.use(logger); // use the logger middleware

// app.get('/', (req, res) => {
//     console.log('Get Request');
//     // res.send('<h1>Hello World</h1>');
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// })

// Members API Routes
app.use('/api/members', require('./routes/api/members')); // auto uses the /api/members route in the members.js router file

const PORT = 5000 || process.env.PORT;
app.listen(PORT, () => {
    `Server started on port ${PORT}`
});