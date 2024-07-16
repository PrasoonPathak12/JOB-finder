const cors = require('cors');
const express = require('express');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const userRouter = require('./routes/userRouter');
const jobRouter = require('./routes/jobRouter');
const applicationRouter = require('./routes/applicationRouter');
const db = require('./database/db');
const errorMiddleware = require('./middlewares/error')

const app = express();
require('dotenv').config({ path: './config/.env' });

// cors setup for establishing connection b/w frontend and backend
app.use(cors({
    origin: ['http://127.0.0.1:5173', 'http://localhost:5173'],
    methods: ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS'],
    credentials: true
}));

app.use(cookieParser());
app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/"
}));

app.use('/api/v1/user', userRouter);
app.use('/api/v1/job', jobRouter);
app.use('/api/v1/application', applicationRouter);

// error handling
app.use(errorMiddleware);

module.exports = app;