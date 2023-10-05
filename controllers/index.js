const express = require('express');
const router = express.Router();



router.get('/', (req, res) => {
    res.render('home');
});

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
