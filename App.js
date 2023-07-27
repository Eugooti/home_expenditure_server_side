const express=require('express')
const cors = require('cors');
const bodyParser=require('body-parser')
const expenditure=require('./Controler/Expenditure')
const UserAuth=require('./Controler/Auth')
const events=require('./Controler/EventsController')
const Expenditure=require('./Models/ExpenditureModel')
const Category=require("./Models/Category")
const User=require("./Models/UsersModel")
const category=require("./Controler/Category")
const Calendar=require('./Models/CalenderModel')
const passport=require('./Config/PassportConfig/passportConfig')
const session = require('express-session');
const cookieParser = require('cookie-parser');
const crypto = require('crypto');


const app=express();


const generateSecretKey = () => {
    return crypto.randomBytes(32).toString('hex');
};



app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    secret: generateSecretKey(),
    resave: false,
    saveUninitialized: false
}));

//db configuration
Expenditure.sync()
    .then(() => {
        console.log('Expenditure model synchronized with the database.');
    })
    .catch((err) => {
        console.error('Error synchronizing Expenditure model:', err);
    });

Category.sync()
    .then(() => {
        console.log('Category model synchronized with the database.');
    })
    .catch((err) => {
        console.error('Error synchronizing Category model:', err);
    });

User.sync()
    .then(() => {
        console.log('User model synchronized with the database.');
    })
    .catch((err) => {
        console.error('Error synchronizing User model:', err);
    });

Calendar.sync()
    .then(()=>{
        console.log('Calendar model synchronized with the database.');
    })
    .catch((err) => {
    console.error('Error synchronizing User model:', err);
});

app.use(cors());
app.use(passport.initialize(undefined));
//routes
app.use(bodyParser.json())
app.use('/api',expenditure);
app.use('/api',UserAuth);
app.use('/api',category)
app.use('/api',events)





app.listen(process.env.port||5000, ()=> {
    console.log("running")
})
