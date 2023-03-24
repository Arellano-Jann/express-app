const express = require('express');
const path = require('path');

const app = express();

// app.get('/', (req, res) => {
//     console.log('Get Request');
//     // res.send('<h1>Hello World</h1>');
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// })


app.use(express.static(path.join(__dirname, 'public'))); // gets the current directory and joins it with the public folder to set the static path as the public folder

const PORT = 5000 || process.env.PORT;
app.listen(PORT, () => {
    `Server started on port ${PORT}`
});