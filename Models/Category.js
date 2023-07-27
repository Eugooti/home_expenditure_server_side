const { DataTypes } = require('sequelize');
const sequelize = require('../Config/DbConfig/Db'); // Assuming you have already created the Sequelize instance

// Define the Category model
const Category = sequelize.define('category', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
});

// Sync the model with the database
Category.sync();

module.exports = Category;
