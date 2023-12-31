const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Projects extends Model {}

Projects.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        body: {
            type: DataTypes.STRING,
            allowNull: false
        },
        summary: {
            type: DataTypes.STRING,
        },
        thumbnail: {
            type: DataTypes.INTEGER,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        created_at: {
            type: DataTypes.DATE
        }
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'projects'
    }
);

module.exports = Projects;