

const prisma = require("../config/prisma")
const createError = require("../utils/createError")



exports.getProfile = async (req, res, next) => {
    try {
     
      const userId = req.user.user.id;
  
     
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
        select: {
          id: true,
          firstname: true,
          lastname: true,
          phonenumber: true,
          address: true,
          email: true,
        },
      });
  
     
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
  
      const checkUser = await prisma.user.findUnique({
        where: { id: userId },
      });
  
      if (!checkUser) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: { firstname, lastname, phonenumber, address, email },
      });
  
      res.json({ message: "Update success", user: updatedUser });
    } catch (err) {
      next(err);
    }
  };
  