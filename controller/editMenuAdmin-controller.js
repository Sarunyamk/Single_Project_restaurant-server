
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
  
  try{

     const {menuName,image,price,description,categoryId} = req.body

     const menu = await prisma.menu_items.findFirst({
      where : {
          menuName
      }
     })

     if(menu){

      return createError(400,"Menu alresdy exist!!")
     }

     const newMenu = await prisma.menu_items.create({
      data : {
          menuName,
          image,
          price,
          description,
          category : {
            connect : {
              id : Number(categoryId)
            }
          }
      }
     })

     res.json({newMenu})
  
  }catch(err){
    next(err)
  }

};

exports.updateMenu = async(req,res,next)=>{

  try{

      const {menuId} = req.params
      const {menuName,image,price,description,categoryId} = req.body
      
      const menu = await prisma.menu_items.update({

          where : {
              id : Number(menuId)
          },

          data : {
            menuName,image,price,description,categoryId
          }
      })


      res.json({message : " update  success"})
  }catch(err){
      next(err)
  }
}

exports.deleteMenu = async(req,res,next)=>{

  try{

      const {menuId} = req.params
      console.log(menuId,"edfsdfsdfsd")
      const menu = await prisma.menu_items.delete({

          where : {
              id : Number(menuId)
          }
      })
      
      res.json(`delete menu ${menuId}`)
  }catch(err){
      next(err)
  }
}
