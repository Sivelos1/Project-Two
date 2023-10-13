const Projects = require('./Projects.js');
const Users = require('./Users.js');
//const Comment = require('./Comment.js');
const Media = require('./Media.js');

Users.hasMany(Projects, {
    foreignKey: 'user_id',
});

Projects.belongsTo(Users);

Projects.hasMany(Media, {
    foreignKey: 'project_id',
});

Media.belongsTo(Projects);

module.exports = { Projects, Media, Users};