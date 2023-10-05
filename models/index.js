const Projects = require('./Projects');
const Users = require('./Users');
const Comment = require('./Comment');
const Media = require('./Media');

Users.belongsToMany(Projects)