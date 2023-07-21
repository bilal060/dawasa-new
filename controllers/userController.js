const HttpError = require('../helpers/http-error');
const User = require('../models/user');
const generatePassword = require('../helpers/generatePassword');
const generateRandomString = require('../helpers/generateRandomString');
const sendUserInvite = require('../helpers/sendUserInvite');
const dotenv = require('dotenv');
dotenv.config();

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

    const link = `${process.env.BACKEND_URL}/api/user/activate-account?token=${token}`;

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

const activateAccount = async (req, res, next) => {
    let verifyToken;
    try {
        verifyToken = await User.findOne({ token: req.query.token });
    } catch (error) {
        console.log(error);
        return next(new HttpError('Error fetching record', 500));
    }

    if (!verifyToken) {
        return next(new HttpError('Invalid token or token expired', 401));
    }

    verifyToken.status = 'ACTIVE';

    try {
        await verifyToken.save();
    } catch (error) {
        console.log(error);
        return next(new HttpError('Email verification failed', 500));
    }

    res.json({
        success: true,
        message: "Account has been activated successfully"
    })
};

const deactivateAccount = async (req, res, next) => {
    let existingUser;
    try {
        existingUser = await User.findById(req.body.userId);
    } catch (error) {
        console.log(error);
        return next(new HttpError('User finding user', 500));
    };

    if (!existingUser) {
        return next(new HttpError('No user found', 404));
    }

    existingUser.status = 'DEACTIVE';

    try {
        await existingUser.save();
    } catch (error) {
        console.log(error);
        return next(new HttpError('Error deactivating account', 500));
    };

    res.json({
        success: true,
        message: 'Your account deactivate successfully!'
    })
};

const userUpdate = async (req, res, next) => {
    let updatedParams = {};
    for (const [key, value] of Object.entries(req.body)) {
        if (value && key !== 'userId') {
            updatedParams[key] = value;
        }
    }

    let updatingUser;
    try {
        updatingUser = await User.findByIdAndUpdate(req.body.userId, updatedParams);
    } catch (error) {
        console.log(error);
        return next(new HttpError('Error finding user', 500));
    };

    if (!updatingUser) {
        return next(new HttpError('No user found', 404));
    }

    res.json({
        success: true,
        message: "User has been updated successfully.",
        data: updatingUser
    });
};

exports.createUser = createUser;
exports.activateAccount = activateAccount;
exports.deactivateAccount = deactivateAccount;
exports.userUpdate = userUpdate;