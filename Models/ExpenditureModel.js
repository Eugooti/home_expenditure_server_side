const { DataTypes } = require('sequelize');
const sequelize = require('../Config/DbConfig/Db'); // Assuming you have already created the Sequelize instance

// Define the Expenditure model
const Expenditure = sequelize.define('Expenditure', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cost:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },


});

// Sync the model with the database
Expenditure.sync();

module.exports = Expenditure;
