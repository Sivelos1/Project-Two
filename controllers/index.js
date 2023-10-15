const express = require('express');
const router = express.Router();
const apiRoutes = require('./api');
const withAuth = require('../utils/auth');
const { init } = require('filestack-js');
const { Users, Projects, Media } = require('../models');
const helpers = require('../utils/helpers');


router.get('/', (req, res) => {
    res.render('home');
});
router.use('/api', apiRoutes);

router.get('/login', (req, res) => {
    res.render('login');
});
router.get('/register', (req, res) => {
    res.replace('login');
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
        const userInfo = await Users.findByPk(req.session.user_id);
        if(userInfo){
            const projects = await Projects.findAll({
                raw:true,
                include:{
                    model:Users,
                    where:{
                        id: req.session.user_id
                    }
                }
            });
            if(projects){
                res.status(200).render('dashboard', {
                    user: userInfo.get({plain:true}),
                    projects: projects,
                });
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
    
})

//specific project
router.get('/project/:id', async (req, res) => {
    try {
        const projectInfo = await Projects.findByPk(req.params.id);
        if(projectInfo){
            res.status(200).render('project', {
                project: projectInfo.get({plain:true}),
                isAuthor: (projectInfo.user_id === req.session.user_id),
            })
        }
        else{
            document.location.replace('error');
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
    
})


router.get('/project/:id/edit', withAuth, async (req, res) => {
    try {
        const projectInfo = await Projects.findOne({
            where:{
                user_id: req.params.id
            }
        });
        if(projectInfo){
            if(projectInfo.user_id === req.session.user_id){
                
                res.status(200).render('edit-project', {
                    projectInfo: projectInfo.get({plain:true})
                });
            }
            else{
                console.log("Access denied; user is not the author of project "+req.params.id+".");
                res.status(401).redirect('/project/'+req.params.id).json({message:"Access denied."});
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
    
})

router.get('/newproject', withAuth, async (req, res) => {
    try {
        console.log("please for gods sake");
        const newProj = await Projects.create({
            title:"New Project",
            body:"",
            summary:"",
            user_id: req.session.user_id,
            status: "",
            created_at: Date.now(),
        });
        if(newProj){
            res.redirect('/project/'+newProj.id+'/edit');
        }
        else{
            res.status(500).replace('error');
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
    
})

router.get('/error', async (req, res) => {
    res.render('error');
})


module.exports = router;
