

const createError = require("../utils/createError")
const { getAllUsers, updateUserRole, deleteUserByuserId } = require('../services/admin-setting-service')


exports.getUsers = async (req, res, next) => {
    try {
        const users = await getAllUsers();
        res.json(users);
    } catch (err) {
        next(err)
    }
};

exports.EditUser = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const { newRole } = req.body;
        const updatedUser = await updateUserRole(Number(userId), newRole);
        res.json(updatedUser);
    } catch (err) {
        next(err);
    }
};

exports.deleteUser = async (req, res, next) => {
    try {
        const { userId } = req.params;
        await deleteUserByuserId(Number(userId));
        res.json({ message: "User deleted" });
    } catch (err) {
        next(err)
    }
};