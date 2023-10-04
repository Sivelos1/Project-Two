const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    //returns all users
    res.status(200);
});

router.get('/:id', (req, res) => {
    //returns single user based on id
    res.status(200);
});

router.post('/', (req, res) => {
    //creates new user (for sign-up purposes)
    res.status(200);
});

router.put('/:id', (req, res) => {
    //updates single user
    res.status(200);
});

router.delete('/:id', (req, res) => {
    //deletes user
    res.status(200);
});

module.exports = router;
