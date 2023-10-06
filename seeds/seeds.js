const fs = require('fs');
const path = require('path');
const sequelize = require('../config/connection');

const Users = require('../models/Users');
const Projects = require('../models/Projects');
const Media = require('../models/Media');
const Comment = require('../models/Comment');

const usersData = JSON.parse(fs.readFileSync(path.join(__dirname, 'usersData.json'), 'utf-8'));
const projectsData = JSON.parse(fs.readFileSync(path.join(__dirname, 'projectsData.json'), 'utf-8'));
const mediaData = JSON.parse(fs.readFileSync(path.join(__dirname, 'mediaData.json'), 'utf-8'));
const commentsData = JSON.parse(fs.readFileSync(path.join(__dirname, 'commentsData.json'), 'utf-8'));

const seedAll = async () => {
    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');

    await Users.bulkCreate(usersData);
    console.log('\n----- USERS SEEDED -----\n');

    await Projects.bulkCreate(projectsData);
    console.log('\n----- PROJECTS SEEDED -----\n');

    await Media.bulkCreate(mediaData);
    console.log('\n----- MEDIA SEEDED -----\n');

    await Comment.bulkCreate(commentsData);
    console.log('\n----- COMMENTS SEEDED -----\n');

    process.exit(0);
};

seedAll();
