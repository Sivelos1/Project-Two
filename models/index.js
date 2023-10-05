const Projects = require('./Projects');
const Users = require('./Users');
const Comment = require('./Comment');
const Media = require('./Media');

Users.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

Users.hasMany(Projects, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

Projects.hasMany(Comment, {
    foreignKey: 'project_id',
    onDelete: 'CASCADE',
});

Projects.hasMany(Media, {
    foreignKey: 'project_id',
    onDelete: 'CASCADE',
});