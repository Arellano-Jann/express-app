const express = require('express');
const router = express.Router();
const members = require('../../Members');
const uuid = require('uuid')


router.get('/', (req,res) => { // rest API - GET all members
    res.json(members); // sends the members array as a json object
});

router.get('/:id', (req, res) => { // gets a specific member by id
    // res.send(req.params.id); // sends the id parameter

    const found = members.some((member) => member.id === parseInt(req.params.id)); // some returns a boolean if the condition is true or false. the condition is that the member.id is equal to the id param.

    if (found) { // if the member is found
        res.json(members.filter((member) => member.id === parseInt(req.params.id))); // parseInt turns the string into an int because member.id is a number. === means both types have to be the same
    }
    else{ // if the member is not found
        res.status(400).json({
            msg: `Member with id ${req.params.id} not found`
        });
    }
})

router.post('/', (req, res) => { // posts a new member to the db
    const newMember = {
        id: uuid.v4(), 
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    }

    if (!newMember.name || !newMember.email) {
        return res.status(400).json({
            msg: 'Missing name and email smh'
        })
    }
    members.push(newMember);
    res.json(members);
});

router.put('/:id', (req, res) => { // updates a member
    const found = members.some((member => member.id === parseInt(req.params.id)));

    if (found){
        const updatedMember = req.body;
        members.forEach((member) => {
            if (member.id === parseInt(req.params.id)){ // if we're at the member we want to change
                member.name = updatedMember.name ? updatedMember.name : member.name; // updates only the things that we WANT (the things that are sent with the request) to update with a ternary operator
                member.email = updatedMember.email ? updatedMember.email : member.email;

                res.json({
                    msg: 'Member updated', member
                });
            }
        })
    }
    else{
        res.status(400).json({
            msg: `Member with id ${req.params.id} not found`
        })
    }
});

router.delete('/:id', (req, res) => {
    const found = members.some((member) => member.id === parseInt(req.params.id));

    if (found){
        res.json({
            msg: 'Member deleted',
            members: members.filter((member) => member.id !== parseInt(req.params.id))
        });
    } else{
        res.status(400).json({
            msg: `Member with id ${req.params.id} not found` 
        })
    }
})

module.exports = router; // router has the get methods? and it exports it?