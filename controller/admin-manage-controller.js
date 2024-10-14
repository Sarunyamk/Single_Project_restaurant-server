
const prisma = require("../config/prisma")
const createError = require("../utils/createError")
const fs = require('fs/promises');

const cloudinary = require('../config/cloudinary');
const multer = require('multer');
const path = require('path');
const storage = multer.memoryStorage();
const upload = multer({ storage });

const { showAllMenuItem, updateMenuItem, deleteMenuItem } = require('../services/menu_items-service')
const { getCategoryNameBycategoryId } = require('../services/category_items-service')



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

        // ตรวจสอบว่ามีไฟล์และข้อมูลที่จำเป็น
        if (!menuName || !price || !description || !categoryId || !file) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        // ตรวจสอบว่ามีเมนูนี้อยู่แล้วหรือไม่
        const existingMenu = await prisma.menu_items.findFirst({
            where: { menuName },
        });

        if (existingMenu) {
            return res.status(400).json({ message: 'Menu with this name already exists.' });
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
                image: uploadResponse.secure_url, // URL ของภาพที่อัปโหลด
                price,
                description,
                category: {
                    connect: { id: Number(categoryId) },
                },
            },
        });

        res.status(201).json({ newMenu });
    } catch (err) {
        next(err);
    } finally {
        // ลบไฟล์ที่อัปโหลดบนเซิร์ฟเวอร์ออกหลังจากการอัปโหลดเสร็จ
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
        console.log(menuId, "edfsdfsdfsd")
        const menu = await deleteMenuItem(menuId)

        res.json(`delete menu ${menuId}`)
    } catch (err) {
        next(err)
    }
}



