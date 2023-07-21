const HttpError = require('../helpers/http-error');
const User = require('../models/user');
const generatePassword = require('../helpers/generatePassword');
const generateRandomString = require('../helpers/generateRandomString');
const sendUserInvite = require('../helpers/sendUserInvite');

const createUser = async (req, res, next) => {

    let existingUser;
    try {
        existingUser = await User.findOne({ email: req.body.email });
    } catch (error) {
        console.log(error);
        return next(new HttpError('Error finding user', 500));
    }

    if (existingUser) {
        return next(new HttpError('Email already exist', 403));
    }

    const password = generatePassword(req.body.first_name);

    const token = await generateRandomString();

    const newUser = new User({
        ...req.body,
        password,
        token
    });

    const link = `http://digimita.com/activate-account?token=${token}`;

    try {
        await sendUserInvite(req.body.first_name, req.body.email, password, link);
    } catch (error) {
        return next(new HttpError(error, 500));
    }

    try {
        await newUser.save();
    } catch (error) {
        console.log(error);
        return next(new HttpError('Error screating new user', 500));
    }

    res.status(201).json({
        success: true,
        message: "User created successfully",
        data: newUser
    })

};

exports.createUser = createUser;