
const prisma = require("../config/prisma")
const createError = require("../utils/createError")
const fs = require('fs/promises');

const cloudinary = require('../config/cloudinary');
const multer = require('multer');
const path = require('path');
const storage = multer.memoryStorage();
const upload = multer({ storage });

const { showAllMenuItem, updateMenuItem, deleteMenuItem, getCategoryNameBycategoryId } = require('../services/menu_items-service')




exports.showAllMenu = async (req, res, next) => {
    try {
        const menu = await showAllMenuItem();
        res.json(menu);
    } catch (err) {
        next(err);
    }
};

exports.getCategoryName = async (req, res, next) => {
    try {

        const category = await getCategoryNameBycategoryId();

        res.json(category)

    } catch (err) {
        next(err)
    }
}



exports.createMenu = async (req, res, next) => {
    try {
        const { menuName, price, description, categoryId } = req.body;
        const file = req.file; // รับไฟล์จาก multer

        if (!menuName || !price || !description || !categoryId || !file) {
            return createError(400, 'Please provide all required fields.');
        }

        const existingMenu = await prisma.menu_items.findFirst({
            where: { menuName },
        });

        if (existingMenu) {
            return createError(400, 'Menu name already exists.');
        }

        // อัปโหลดไฟล์ไปยัง Cloudinary
        const uploadResponse = await cloudinary.uploader.upload(file.path, {
            resource_type: 'auto', // ตรวจจับประเภทไฟล์โดยอัตโนมัติ
            public_id: path.parse(file.path).name, // สร้าง public_id
            overwrite: true, // จะเขียนทับถ้าชื่อไฟล์เหมือนกัน
        });

        // สร้างเมนูใหม่
        const newMenu = await prisma.menu_items.create({
            data: {
                menuName,
                image: uploadResponse.secure_url,
                price,
                description,
                category: {
                    connect: {
                        id: Number(categoryId)
                    },
                },
            },
        });

        res.json({ newMenu });
    } catch (err) {
        next(err);
    } finally {
        if (req.file?.path) {
            fs.unlink(req.file.path, (err) => {
                if (err) console.error('Error removing file:', err);
            });
        }
    }
};



exports.updateMenu = async (req, res, next) => {

    try {

        const { menuId } = req.params
        const { menuName, price, description } = req.body

        const menu = await updateMenuItem(menuId, menuName, price, description)

        res.json({ message: `update menu ${menu.menuName} success` })
    } catch (err) {
        next(err)
    }
}

exports.deleteMenu = async (req, res, next) => {

    try {

        const { menuId } = req.params
        const menu = await deleteMenuItem(menuId)

        res.json({ message: 'Menu deleted successfully', menuId: menuId });

    } catch (err) {
        next(err)
    }
}



