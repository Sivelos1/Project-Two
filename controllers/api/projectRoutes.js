const express = require('express');
const router = express.Router();
const { Project } = require('../../models');

router.get('/', async (req, res) => {
    //returns all projects (maybe there could be arguments that make it so you can get all projects of a certain user?)
    try {
        var projInfo;
        if(req.body.userID){
            projInfo = await Project.findAll({
                where:{
                    user_id: req.body.userID
                }
            });
        }
        else{
            projInfo = await Project.findAll();
        }
        if(projInfo){
            const p = await projInfo.map((project) => project.get({plain: true}));
            res.status(200).json(p);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

router.get('/:id', async (req, res) => {
    //returns single project based on id
    try {
        var projInfo = await Project.findByPk(req.params.id);
        if(projInfo){
            const p = projInfo.get({plain: true});
            res.status(200).json(p);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

router.post('/', async (req, res) => {
    //creates new project
    try {
        var projInfo = await Project.create({
            title: req.body.title,
            body: req.body.body,
            user_id: req.body.user_id,
            status: req.body.status,
            created_at: req.body.created_at
        });
        res.status(200).json(projInfo);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

router.put('/:id', async (req, res) => {
    //updates single project
    try {
        var projInfo = await Project.findByPk(req.params.id);
        if(projInfo){
            await projInfo.update({
                title: req.body.title || projInfo.title,
                body: req.body.body || projInfo.body,
                user_id: req.body.user_id || projInfo.user_id,
                status: req.body.status || projInfo.status,
                created_at: req.body.created_at || projInfo.created_at
            });
            res.status(200).json(projInfo)
        }   
        else{
            res.status(404).json({message: 'Couldn\'t find project!'})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

router.delete('/:id', async (req, res) => {
    //deletes project
    try {
        var data = null;
        if(req.body.trueDelete){
            //actually deletes entry
            data = await Project.destroy({
                where: {
                    id: req.params.id,
                },
            });
        }
        else{
            //marks entry as soft-deleted
            data = await Project.update({
                status: 'deleted',
            })
        }
        if (!data) {
            res.status(404).json({ message: 'No project found with that id!' });
            return;
        }
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
    res.status(200);
});


module.exports = router;
