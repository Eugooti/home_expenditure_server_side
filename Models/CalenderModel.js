const {DataTypes, INTEGER}=require('sequelize')
const sequelize=require('../Config/DbConfig/Db');

//the events modal

const CalendarEvents=sequelize.define('Events',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    title:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    description:{
        type:DataTypes.STRING,
        allowNull: false
    },
    start:{
        type:DataTypes.STRING,
        allowNull:false
    },
    end:{
        type:DataTypes.STRING,
        allowNull:false
    },
    CreatedBy:{
        type:DataTypes.STRING,
        allowNull:false
    }
});

// Sync the model with the database
CalendarEvents.sync();
module.exports=CalendarEvents;
