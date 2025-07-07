const userService = require('../services/userService');
const { getLoggedInUserId } = require('../utils/utils');


const login = async (req, res) => {
    const user = await userService.userLogin(req);
    return res.status(200).send(user);
};

const register = async (req, res) => {
    const user = await userService.userRegister(req);
    return res.status(201).send(user);
};

const updateUser = async (req, res) => {
    const user = await userService.updateUser(req);
    return res.status(200).send(user);
}

const fetchAllUsers = async (req, res) => {
    const users = await userService.fetchAllUsers();
    return res.status(200).send(users);
};

const fetchLoggedInUser = async (req, res) => {
    const user = await userService.fetchUserById(getLoggedInUserId(req));
    return res.status(200).send(user)
};

module.exports = {
    login,
    register,
    updateUser,
    fetchAllUsers,
    fetchLoggedInUser
};