const Sequelize = require('sequelize');

// Create a Sequelize instance
const sequelize = new Sequelize('expenditure_tracker', 'root', 'IN16/00054/19', {
    host: 'localhost', // MySQL server host
    dialect: 'mysql',
    port: 3306,
    logging: false,
    timezone: '+00:00',
    // Additional Sequelize options, if needed
});

module.exports=sequelize;


//
