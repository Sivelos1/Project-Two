const express = require('express');
const router = express.Router();

const projectRoutes = require('./projectRoutes');
const userRoutes = require('./userRoutes');
const mediaRoutes = require('./mediaRoutes');

router.use('/projects', projectRoutes);
router.use('/users', userRoutes);
router.use('/media', mediaRoutes);

module.exports = router;
