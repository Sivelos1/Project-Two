const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    //returns all media
    //arguments could return media for specific project?
    res.status(200);
});

router.get('/:id', (req, res) => {
    //returns single media based on id
    res.status(200);
});

router.post('/', (req, res) => {
    //creates new media
    res.status(200);
});

router.put('/:id', (req, res) => {
    //updates single media
    res.status(200);
});

router.delete('/:id', (req, res) => {
    //deletes media
    res.status(200);
});


module.exports = router;
