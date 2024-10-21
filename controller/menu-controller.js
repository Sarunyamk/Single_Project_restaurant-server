const prisma = require("../config/prisma")
const createError = require("../utils/createError")
const { showAllMenuItem, getCategoryMain, getCategorySalad,
  getCategorySandwichSnack, getCategoryBeverage } = require("../services/menu_items-service")



exports.showAllMenu = async (req, res, next) => {
  try {
    const menu = await showAllMenuItem();
    res.json(menu);
  } catch (err) {
    next(err);
  }
};

exports.mainMenu = async (req, res, next) => {
  try {
    const mainMenu = await getCategoryMain()
    res.json(mainMenu);
  } catch (err) {
    next(err);
  }
};

exports.saladMenu = async (req, res, next) => {
  try {
    const saladMenu = await getCategorySalad()
    res.json(saladMenu);
  } catch (err) {
    next(err);
  }
};

exports.sandwichSnackMenu = async (req, res, next) => {
  try {
    const swAndSnackMenu = await getCategorySandwichSnack()
    res.json(swAndSnackMenu);
  } catch (err) {
    next(err);
  }
};
exports.beverageMenu = async (req, res, next) => {
  try {
    const bevMenu = await getCategoryBeverage()
    res.json(bevMenu);
  } catch (err) {
    next(err);
  }
};


exports.getPopularMenus = async (req, res, next) => {
  try {
    // ดึงยอดขายเมนูที่มียอด count มากที่สุดจาก order_detail
    const popularMenus = await prisma.order_detail.groupBy({
      by: ['itemId'],
      _sum: {
        count: true, // รวมยอด count ของแต่ละ item
      },
      orderBy: {
        _sum: {
          count: 'desc',
        },
      },
      take: 8, // จำกัดการดึงข้อมูลเฉพาะ 5 เมนูที่ขายดีที่สุด
    });

    // ดึงข้อมูลรายละเอียดเมนูแต่ละอัน ยกเว้นหมวดหมู่ Category ID = 5
    const menuItemsWithNames = await Promise.all(
      popularMenus.map(async (menu) => {
        const item = await prisma.menu_items.findUnique({
          where: { id: menu.itemId },
        });
        // ค้นหาเมนูตาม itemId ที่ได้จากผลลัพธ์ก่อนหน้า
        // กรองเมนูที่อยู่ในหมวดหมู่ที่ไม่ต้องการ
        if (item.categoryId !== 5) {
          return {
            menuName: item.menuName,
            image: item.image,
            description: item.description,
            price: item.price,
            totalCount: menu._sum.count,
          };
        }
      })
    );

    // กรองค่า undefined ที่เกิดจากเมนูที่มี categoryId = 5
    const filteredMenus = menuItemsWithNames.filter(menu => menu !== undefined);

    res.json(filteredMenus);
  } catch (err) {
    next(err);
  }
};
