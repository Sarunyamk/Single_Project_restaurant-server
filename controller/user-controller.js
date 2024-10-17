

const prisma = require("../config/prisma")
const createError = require("../utils/createError")
const { getUserProfile, checkUserByUserId } = require('../services/user-service')


exports.getProfile = async (req, res, next) => {
  try {

    const userId = req.user.user.id;

    const user = await getUserProfile(userId);

    if (!user) {
      return createError(404, "User not found");
    }
    res.json(user);

  } catch (err) {
    next(err);
  }
};

exports.editProfile = async (req, res, next) => {
  try {

    const userId = Number(req.params.userId);
    const { firstname, lastname, phonenumber, address, email } = req.body;

    const checkUser = await checkUserByUserId(userId);

    if (!checkUser) {
      return next(createError(404, "User not found"));
    }

    const checkPhone = await prisma.user.findFirst({
      where: { phonenumber },
    });
    if (checkPhone && checkPhone.id !== userId) {
      return next(createError(400, "Phone number already exists"));
    }

    const checkEmail = await prisma.user.findFirst({
      where: { email },
    });
    if (checkEmail && checkEmail.id !== userId) {
      return next(createError(400, "Email already exists"));
    }

    // อัปเดตข้อมูลผู้ใช้
    const updatedUser = await prisma.user.update({
      where: { id: userId }, // ใช้ userId ในการอัปเดต
      data: { firstname, lastname, phonenumber, address, email },
    });

    res.json({ message: "Update success", user: updatedUser });
  } catch (err) {
    console.error("Error in editProfile:", err);
    next(err);
  }
};


