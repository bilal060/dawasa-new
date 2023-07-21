const express = require('express');
const mongoose = require('mongoose');
const sanitizeHtml = require('sanitize-html');
const mongoSanitize = require('express-mongo-sanitize');
const cookieParser = require("cookie-parser");
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

const HttpError = require('./helpers/http-error');
const userRoutes = require('./routes/users');
const prepaidRoutes = require('./routes/prepaid');
const postpaidRoutes = require('./routes/postpaid');

const app = express();

app.use(express.json());

app.use(cookieParser());

function checkForHTMLTags(req, res, next) {
    const { body } = req;
    const keys = Object.keys(body);

    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = body[key];

        if (typeof value === 'string' && sanitizeHtml(value) !== value) {
            return res.status(400).json({ error: 'HTML tags are not allowed in the request body' });
        }
    }
    next();
}

app.use(checkForHTMLTags);
app.use(helmet());
app.use(mongoSanitize());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 100,
    message: 'To many request from this IP now please wait for an hour!'
})

// app.use('/uploads/images', express.static(path.join('uploads', 'images')));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
    next();
});

app.use('/api', limiter);

app.use('/api', userRoutes);
app.use('/api', prepaidRoutes);
app.use('/api', postpaidRoutes);

app.use((req, res, next) => {
    throw new HttpError('Could not find the route', 404);
})

app.use((error, req, res, next) => {
    if (req.file) {
        fs.unlink(req.file.path, err => console.log(err));
    }
    if (res.headerSent) {
        return next(error)
    }
    res.status(error.code || 500);
    res.json({ message: error.message || 'An unknown error occured' });
});

mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log(`Connected to db on port ${process.env.PORT}`);
    app.listen(process.env.PORT || 5000);
}).catch(err => {
    console.log(err);
});