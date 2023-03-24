const moment = require('moment');

const logger = (req, res, next) => { // logger middleware. next is a callback that moves on to the next middleware in the stack
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl} : ${moment().format()}`); // http :// localhost:5000 /api/members
    next();
}

module.exports = logger;