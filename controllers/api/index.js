const express = require('express');
const router = express.Router();

const projectRoutes = require('./projectRoutes');
const userRoutes = require('./userRoutes');
const mediaRoutes = require('./mediaRoutes');
//const commentRoutes = require('./commentRoutes');

router.use('/projects', projectRoutes);
router.use('/users', userRoutes);
router.use('/media', mediaRoutes);
//router.use('/comments', commentRoutes);

module.exports = router;
