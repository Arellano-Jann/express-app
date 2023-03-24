const express = require('express');
const router = express.Router();
const members = require('./Members');

router.get('/api/members', (req,res) => { // rest API - get
    res.json(members); // sends the members array as a json object
});

router.get('/api/members/:id', (req, res) => {
    // res.send(req.params.id); // sends the id parameter

    const found = members.some((member) => member.id === parseInt(req.params.id)); // some returns a boolean if the condition is true or false. the condition is that the member.id is equal to the id param.

    if (found) {
        res.json(members.filter((member) => member.id === parseInt(req.params.id))); // parseInt turns the string into an int because member.id is a number. === means both types have to be the same
    }
    else{
        res.status(400).json({
            msg: `Member with id ${req.params.id} not found`
        });
    }
})

module.exports = router; // router has the get methods? and it exports it?