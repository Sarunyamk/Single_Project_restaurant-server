const prisma = require("../config/prisma")

exports.getAllUsers = async () => {
    return await prisma.user.findMany();
};

exports.updateUserRole = async (userId, newRole) => {
    return await prisma.user.update({
        where: { id: userId },
        data: { role: newRole }
    });
};

exports.deleteUserByuserId = async (userId) => {
    return await prisma.user.delete({
        where: { id: userId }
    });
};