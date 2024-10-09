
const prisma = require("../config/prisma")
const createError = require("../utils/createError")
const fs = require('fs/promises');

const cloudinary = require('../config/cloudinary');
const multer = require('multer');
const path = require('path');
const storage = multer.memoryStorage();
const upload = multer({ storage });



exports.showAllMenu = async (req, res, next) => {
  try {
    const menu = await prisma.menu_items.findMany({
      select: {
        id: true,
        menuName: true,
        price: true,
        image: true,
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

exports.getCategoryName = async (req, res, next) => {
  try {

    const category = await prisma.category_items.findMany({
      select: {
        id: true,
        categoryName: true
      }
    })

    res.json(category)

  } catch (err) {
    next(err)
  }
}


exports.createMenu = async (req, res, next) => {
  try {
    const { menuName, price, description, categoryId } = req.body;
    const file = req.file; // รับไฟล์จาก multer
    // อัปโหลดไฟล์ไปยัง Cloudinary

    const uploadResponse = await cloudinary.uploader.upload(file.path, {
      resource_type: 'auto', // จะตรวจจับประเภทไฟล์โดยอัตโนมัติ
      public_id: path.parse(req.file.path).name, // สร้าง public_id
      overwrite: true, // จะเขียนทับถ้าชื่อไฟล์เหมือนกัน
    });


    const newMenu = await prisma.menu_items.create({
      data: {
        menuName,
        image: uploadResponse.secure_url, // URL ของภาพที่อัปโหลด
        price,
        description,
        category: {
          connect: { id: Number(categoryId) },
        },
      },
    });
    res.json({ newMenu });
  } catch (err) {
    next(err);
  } finally {

    fs.unlink(req?.file?.path)
  }
};


exports.updateMenu = async (req, res, next) => {

  try {

    const { menuId } = req.params
    const { menuName, price, description } = req.body

    const menu = await prisma.menu_items.update({

      where: {
        id: Number(menuId)
      },

      data: {
        menuName, price, description
      }
    })

    console.log(menu, "edit menu")
    res.json({ message: `update menu ${menu.menuName} success` })
  } catch (err) {
    next(err)
  }
}

exports.deleteMenu = async (req, res, next) => {

  try {

    const { menuId } = req.params
    console.log(menuId, "edfsdfsdfsd")
    const menu = await prisma.menu_items.delete({

      where: {
        id: Number(menuId)
      }
    })

    res.json(`delete menu ${menuId}`)
  } catch (err) {
    next(err)
  }
}
