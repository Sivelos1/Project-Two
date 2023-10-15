const express = require('express');
const router = express.Router();
const apiRoutes = require('./api');
const withAuth = require('../utils/auth');
const { init } = require('filestack-js');
const {Users, Projects, Comment, Media} = require('../models');

router.get('/register', (req, res) => {
    res.render('registerAccount');
});

router.get('/', (req, res) => {
    res.render('home');
});
router.use('/api', apiRoutes);

router.get('/login', (req, res) => {
    res.render('login');
});
router.get('/profile', withAuth, async (req, res) => {
    const userInfo = Users.findByPk(req.session.user_id); 
    if(userInfo){
        res.render('profile');
    }
    else{
        document.location.replace('/');
    }
});

router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const userInfo = Users.findByPk(req.session.user_id);
        if(userInfo){
            const projects = Projects.findAll();
            if(projects){
                res.status(200).render('dashboard', {
                    user: userInfo,
                    projects: projects
                });
            }
        }
    } catch (error) {
        res.status(500).render('error');
    }
    
})

//specific project
router.get('/project/:id', async (req, res) => {
    try {
        const projectInfo = Projects.findOne({
            where:{
                user_id: req.params.id
            }
        });
        if(projectInfo){
            const comments = Comment.findAll({
                where:{
                    project_id: projectInfo.id
                }
            })
            if(comments){
                res.status(200).render('project', {
                    project: projectInfo,
                    isAuthor: (projectInfo.user_id === req.session.user_id),
                    comments: comments
                })
            }
        }
    } catch (error) {
        res.status(500).render('error');
    }
    
})



module.exports = router;
