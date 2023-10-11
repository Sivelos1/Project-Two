const express = require('express');
const router = express.Router();
const apiRoutes = require('./api');
const withAuth = require('../utils/auth');
const { init } = require('filestack-js');


router.get('/', (req, res) => {
    res.render('home');
});
router.use('/api', apiRoutes);

router.get('/login', (req, res) => {
    res.render('login');
});
router.get('/profile', withAuth, async (req, res) => {
    const userInfo = await fetch('/api/users/'+req.session.user_id);
    if(userInfo){
        res.render('profile');
    }
    else{
        document.location.replace('/');
    }
});

router.get('/dashboard', withAuth, async (req, res) => {
    const userInfo = await fetch('/api/users/'+req.session.user_id);
    if(userInfo){
        const projects = await fetch('/api/projects/', {
            body:JSON.stringify({user_id: req.session.user_id}),
        })
        if(projects){
            res.render('dashboard', {
                user: userInfo,
                projects: projects
            });
        }
    }
})

//specific project
router.get('/project/:id', async (req, res) => {
    const projectInfo = await fetch('/api/projects/'+req.params.id);
    if(projectInfo){
        const comments = await fetch('/api/comments/', {
            body: JSON.stringify({projectID: req.params.id})
        })
        if(comments){
            res.render('project', {
                project: projectInfo,
                isAuthor: (projectInfo.user_id === req.session.user_id),
                comments: comments
            })
        }
    }
})



module.exports = router;
