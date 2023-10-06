const express = require('express');
const router = express.Router();
const { Comment } = require('../../models');

router.get('/', async (req, res) => {
    //returns all projects (maybe there could be arguments that make it so you can get all projects of a certain user?)
    try {
        var commentInfo;
        if(req.body.projectID){
            commentInfo = await Comment.findAll({
                where:{
                    project_id: req.body.projectID
                }
            });
        }
        else{
            commentInfo = await Comment.findAll();
        }
        if(commentInfo){
            const c = await commentInfo.map((comment) => comment.get({plain: true}));
            res.status(200).json(c);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

router.get('/:id', async (req, res) => {
    //returns single project based on id
    try {
        var commentInfo = await Comment.findByPk(req.params.id);
        if(commentInfo){
            const p = commentInfo.get({plain: true});
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
        var commentInfo = await Comment.create({
            content: req.body.content,
            user_id: req.body.user_id || req.session.user_id,
            project_id: req.body.project_id,
            created_at: req.body.created_at
        });
        res.status(200).json(commentInfo);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

router.put('/:id', async (req, res) => {
    //updates single project
    try {
        var commentInfo = await Projects.findByPk(req.params.id);
        if(commentInfo){
            await commentInfo.update({
                content: req.body.content || commentInfo.content,
                user_id: req.body.user_id || commentInfo.user_id,
                project_id: req.body.project_id || commentInfo.project_id,
            });
            res.status(200).json(commentInfo)
        }   
        else{
            res.status(404).json({message: 'Couldn\'t find comment!'})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

router.delete('/:id', async (req, res) => {
    //deletes project
    try {
        var data = await Comment.destroy({
            where: {
                id: req.params.id,
            },
        });
        if (!data) {
            res.status(404).json({ message: 'No comment found with that id!' });
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
