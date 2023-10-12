const Projects = require('./Projects.js');
const Users = require('./Users.js');
const Comment = require('./Comment.js');
const Media = require('./Media.js');

Users.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

Users.hasMany(Projects, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

Projects.belongsTo(Users, {
    foreignKey: '',
});

Projects.hasMany(Comment, {
    foreignKey: 'project_id',
    onDelete: 'CASCADE',
});

Projects.hasMany(Media, {
    foreignKey: 'project_id',
    onDelete: 'CASCADE',
});

Comment.belongsTo(Projects, {
    foreignKey: 'project_id'
});

Comment.belongsTo(Users, {
    foreignKey: 'user_id'
});

Media.belongsTo(Projects,{
    foreignKey: 'project_id'
});

module.exports = { Projects, Media, Users, Comment };