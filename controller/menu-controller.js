const prisma = require("../config/prisma")
const createError = require("../utils/createError")


exports.showAllMenu = async (req, res, next) => {
    try {
      const menu = await prisma.menu_items.findMany({
        select: {
          id: true,
          menuName: true,
          price: true,
          description: true,
          category: { 
            select: {
              id: true,
              categoryName: true 
            }
          }
        }
      });
  
      res.json(menu); 
    } catch (err) {
      next(err); 
    }
  };

exports.createMenu = async (req, res, next) => {
    try {

        const {menuName,price,description,categoryId} = req.body

      const checkMenu = await prisma.menu_items.findFirst({
        where: {
            menuName : menuName
        }
      });

      if(checkMenu){
        return createError(400,"Menu already exist")
      }

      const newMenu = await prisma.menu_items.create({
        data : {
            menuName,
            price,
            description,
            category : {
                connect : {
                    id : Number(categoryId)
                }
            }
        }
      });
  
      res.json(newMenu); 
    } catch (err) {
      next(err); 
    }
  };