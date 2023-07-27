const { DataTypes } = require('sequelize');
const sequelize = require('../Config/DbConfig/Db'); // Assuming you have already created the Sequelize instance

// Define the User model/table
const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    fullName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    emailAddress: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    facebook: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    twitter: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    linkedIn: {
        type: DataTypes.STRING,
        allowNull: true,
    },

});

// Sync the model with the database
User.sync();

module.exports = User;
