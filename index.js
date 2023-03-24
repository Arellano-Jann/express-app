const express = require('express');
const path = require('path');
const logger = require('./middleware/logger');
const exphbs = require('express-handlebars'); // note that you should only really do an API or a server side app with templates. not both. you should use a front end framework with the API
// but you can have both because you might have a regular app and then a form could be changing a database so in that case, you COULD have both etc
const members = require('./Members');

const app = express();
    
// Middleware stuff
app.use(logger); // use the logger middleware

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' })); // Handlebars Middleware
app.set('view engine', 'handlebars');

app.get('/', (req, res) => res.render('index', {
    title: 'Member App', // this is rendered in the index.hbs file with {{title}}
    members // {{members}}
})); // renders the index.handlebars file

// app.get('/', (req, res) => {
//     console.log('Get Request');
//     // res.send('<h1>Hello World</h1>');
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// })

app.use(express.json()); // handles raw json
app.use(express.urlencoded({ extended: false })); // handles url encoded data

app.use(express.static(path.join(__dirname, 'public'))); // gets the current directory and joins it with the public folder to set the static path as the public folder

// Members API Routes
app.use('/api/members', require('./routes/api/members')); // auto uses the /api/members route in the members.js router file

const PORT = 5000 || process.env.PORT;
app.listen(PORT, () => {
    `Server started on port ${PORT}`
});