const { Model, DataTypes } = require('sequelize');

const { Model, DataTypes } = require('sequelize');

//create users model
class Users extends Model {}

//create fields/columns for Users model
Users.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false
        },
        created_at: {
            type: DataTypes.TIME
        }
    }
)
