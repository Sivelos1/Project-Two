const express = require('express');
const router = express.Router();
const { Users } = require('../../models');

router.get('/', async (req, res) => {
    //returns all user
    try {
        const userInfo = await Users.findAll();
        if(userInfo){
            const p = await userInfo.map((user) => user.get({plain: true}));
            res.status(200).json(p);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

router.get('/:id', async (req, res) => {
    //returns single user based on id
    try {
        var userInfo = await Users.findByPk(req.params.id);
        if(userInfo){
            const p = userInfo.get({plain: true});
            res.status(200).json(p);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

router.post('/', async (req, res) => {
    //creates new user
    try {
        var userInfo = await Users.create({
            email: req.body.email,
            username: req.body.username,
            role: req.body.role || "User",
            password: req.body.password,
            created_at: req.body.created_at || Date.now()
        });
        req.session.save(() => {
            req.session.user_id = userInfo.id;
            req.session.logged_in = true;
            res.status(200).json(userInfo);
          });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});


router.post('/login', async (req, res) => {
    try {
      const userData = await Users.findOne({ where: { email: req.body.email } });
  
      if (!userData) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
  
      const validPassword = await userData.checkPassword(req.body.password);
  
      if (!validPassword) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
  
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
        
        res.json({ user: userData, message: 'You are now logged in!' });
      });
  
    } catch (err) {
      res.status(400).json(err);
    }
  });
  
  
router.post('/logout', (req, res) => {
if (req.session.logged_in) {
    req.session.destroy(() => {
    res.status(204).end();
    });
} else {
    res.status(404).end();
}
});

router.put('/:id', async (req, res) => {
    //updates single project
    try {
        var userInfo = await Users.findByPk(req.params.id);
        if(userInfo){
            await userInfo.update({
                username: req.body.username || userInfo.username,
                role: req.body.role || userInfo.role,
                password: req.body.password || userInfo.password,
                created_at: req.body.created_at || userInfo.created_at
            });
            res.status(200).json(userInfo)
        }   
        else{
            res.status(404).json({message: 'Couldn\'t find user!'})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

router.delete('/:id', async (req, res) => {
    //deletes project
    try {
        const data = await Users.destroy({
            where: {
                id: req.params.id,
            },
        });
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