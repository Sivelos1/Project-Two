const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Media extends Model {}

Media.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        project_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Projects',
                key: 'id',
                unique: false
            }
        },
        uploader_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Users',
                key: 'id',
                unique: false
            }
        },
        metadata:{
            type: DataTypes.JSON,
            allowNull: false
        },
        url: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'media'
    }
);

module.exports = Media;