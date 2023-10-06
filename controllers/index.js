const express = require('express');
const router = express.Router();
const apiRoutes = require('./api');


router.get('/', (req, res) => {
    res.render('home');
});
router.use('/api', apiRoutes);

router.get('/login', (req, res) => {
    res.render('login');
});
router.get('/profile', async (req, res) => {
    const userInfo = await fetch('/api/users/'+req.session.user_id);
    if(userInfo){
        res.render('profile',{
            username: userInfo.username
        });
    }
    else{
        document.location.replace('/');
    }
});


module.exports = router;
