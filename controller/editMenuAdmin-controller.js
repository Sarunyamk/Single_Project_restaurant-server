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