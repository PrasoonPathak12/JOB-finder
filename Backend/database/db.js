const mongoose = require('mongoose');
require('dotenv').config({ path: './config/.env' });

const MongodbUrl = process.env.MONGODB_CLOUD_URL;
mongoose.connect(MongodbUrl, {
        dbName: 'Job_finder'
    }
);

const db = mongoose.connection;

db.on('connected', ()=>{
    console.log('Connected to database');
});

db.on('error', (err)=>{
    console.log(`Error while connecting to database : ${err}`);
});

db.on('disconnected', ()=>{
    console.log('database disconnected');
});

module.exports = db;