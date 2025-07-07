require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getLoggedInUserId } = require('../utils/utils');

const userModel = require('../models/user');

const hashPassword = async (password) => {
    return await bcrypt.hash(password, 12);
};

const fetchAllUsers = async () => {
    return await userModel.find({ deletedTimeStamp: null });
};

const fetchUserByEmail = async (email) => {
    return await userModel.findOne({ email });
};

const fetchUserById = async (userId) => {
    return await userModel.findById(userId);
};

const userLogin = async (req) => {
    const user = await fetchUserByEmail(req.body.email);
    if (!user) {
        throw { message: 'User not found with the given credentials. Please try again.', status: 404 };
    }
    else {
        const doesPasswordMatch = await bcrypt.compare(req.body.password, user.password);
        if (!doesPasswordMatch) {
            throw { message: 'Incorrect Password', status: 401 };
        }
        const token = jwt.sign({ userId: user._id.toString() }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return { authToken: token, user: user.toObject() };
    }
};

const userRegister = async (req) => {
    const user = await fetchUserByEmail(req.body.email);
    if (user) {
        throw { message: 'User already exists', status: 409 };
    }
    else {
        const hashedPwd = await hashPassword(req.body.password);
        const userObj = {
            username: req.body.username,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: hashedPwd,
        }
        const createdUser = await userModel.create(userObj);
        if (!createdUser) {
            throw { message: 'User could not be created', status: 500 };
        }
        return userLogin(req);
    }
};

const updateUser = async (req) => {
    const userInfoBeforeUpdate = await fetchUserById(getLoggedInUserId(req));
    if (!userInfoBeforeUpdate) {
        throw { message: 'User not found', status: 404 };
    }

    const checkIfEmailAlreadyExists = await fetchUserByEmail(req.body.email);
    if (checkIfEmailAlreadyExists && checkIfEmailAlreadyExists._id.toString() !== userInfoBeforeUpdate._id.toString()) {
        throw { message: 'Email already exists', status: 409 };
    }
    let password = userInfoBeforeUpdate.password;
    if (req.body.password) {
        password = await hashPassword(req.body.password);
    }

    let updatedUser = await userModel.findByIdAndUpdate(
        userInfoBeforeUpdate._id,
        {
            username: req.body.username || userInfoBeforeUpdate.username,
            firstname: req.body.firstname || userInfoBeforeUpdate.firstname,
            lastname: req.body.lastname || userInfoBeforeUpdate.lastname,
            email: req.body.email || userInfoBeforeUpdate.email,
            password: password
        },
        { new: true }
    );
    if (!updatedUser) {
        throw { message: 'User could not be updated', status: 500 };
    }

    return updatedUser.toObject();
};

module.exports = {
    userLogin,
    userRegister,
    updateUser,
    fetchAllUsers,
    fetchUserById
};