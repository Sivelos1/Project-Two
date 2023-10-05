const express = require('express');
const router = express.Router();
const { Media, Project } = require('../../models')

router.get('/', async (req, res) => {
    //returns all media
    //arguments could return media for specific project?
    try {
        var mediaInfo = null;
        if(req.body.projectID){
            mediaInfo = await Media.findAll({
                where:{
                    parent: req.body.projectID
                }
            });
        }
        else{
            mediaInfo = await Media.findAll();
        }
        if(mediaInfo){
            const m = mediaInfo.map((media) => media.get({plain: true}));
            res.status(200).json(m);
        }
    } catch (error) {
        res.status(400).json(error);
    }
});

router.get('/:id', async (req, res) => {
    //returns single media based on id
    res.status(200);
    try {
        var mediaInfo = await Media.findByPk(req.params.id);
        res.status(200).json(mediaInfo.get({plain: true}));
    } catch (error) {
        res.status(400).json(error);
    }
});

router.post('/', async (req, res) => {
    //creates new media
    try {
        var mediaInfo = await Project.create({
            url: req.body.url,
            metadata: JSON.parse(req.body),
            uploader_id: req.session.user_id,
        });
        res.status(200).json(mediaInfo);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.put('/:id', async (req, res) => {
    //updates single media
    res.status(200);
});

router.delete('/:id', (req, res) => {
    //deletes media
    res.status(200);
});


module.exports = router;
