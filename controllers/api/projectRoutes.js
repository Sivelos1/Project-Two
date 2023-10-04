const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    //returns all projects (maybe there could be arguments that make it so you can get all projects of a certain user?)
    res.status(200);
});

router.get('/:id', (req, res) => {
    //returns single project based on id
    res.status(200);
});

router.post('/', (req, res) => {
    //creates new project
    res.status(200);
});

router.put('/:id', (req, res) => {
    //updates single project
    res.status(200);
});

router.delete('/:id', (req, res) => {
    //deletes project
    res.status(200);
});


module.exports = router;
