const express = require('express');
const router = express.Router();
const apiRoutes = require('./api');
const withAuth = require('../utils/auth');
const { init } = require('filestack-js');
const { Users, Projects, Media } = require('../models');
const Cookie = require('../utils/cookie');


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
                    user: userInfo,
                    projects: projects
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
        const projectInfo = Projects.findOne({
            where:{
                user_id: req.params.id
            }
        });
        if(projectInfo){
            res.status(200).render('project', {
                project: projectInfo,
                isAuthor: (projectInfo.user_id === req.session.user_id),
            })
            /*const comments = Comment.findAll({
                where:{
                    project_id: projectInfo.id
                }
            })
            if(comments){
                
            }*/
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
    
})


router.get('/project/:id/edit', withAuth, async (req, res) => {
    try {
        const projectInfo = Projects.findOne({
            where:{
                user_id: req.params.id
            }
        });
        if(projectInfo){
            Cookie.set("project", req.params.id);
            res.status(200).render('edit-project', {
                projectInfo: projectInfo
            });
            /*
            if(projectInfo.user_id === req.session.user_id){
                
            }
            else{
                console.log("Access denied; user is not the author of project "+req.params.id+".");
                res.status(401).redirect('/project/'+req.params.id).json({message:"Access denied."});
            }*/
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
    
})

router.post('/project/new', withAuth, async (req, res) => {
    try {
        console.log(req.session.user_id);
        const newProj = await Projects.create({
            title:"New Project",
            body:"",
            summary:"",
            user_id: req.session.user_id,
            status: "",
            created_at: Date.now(),
        });
        res.render('edit-project');
        if(newProj){
            res.status(200).replace(`/project/${newProj.id}/edit`);
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
