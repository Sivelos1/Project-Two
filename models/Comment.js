const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Media.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        content:{
            type: DataTypes.TEXT,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'users',
                key: 'id',
                unique: false
            }
        },
        project_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Projects',
                key: 'id',
                unique: false
            }
        },
        created_at: {
            type: DataTypes.DATE
        }
    }

module.exports = Comment;