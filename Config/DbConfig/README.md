this is the db connector;

1. libraries: sequelize

2. import to sequelize
3. A connection instance is created  by creating a Sequelize instance and to connect to a Mysql
   
// Create a Sequelize instance
 const sequelize = new Sequelize('database name', 'root', 'password', {
   host: 'localhost', // MySQL server host
   dialect: 'mysql',//db type
   port: 3306,
   logging: false,
   timezone: '+00:00',
   // Additional Sequelize options, if needed
   });
4. export the connection
