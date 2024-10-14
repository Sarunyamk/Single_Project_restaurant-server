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
      take: 5,
    });

    const menuItemsWithNames = await Promise.all(
      popularMenus.map(async (menu) => {
        const item = await prisma.menu_items.findUnique({
          where: { id: menu.itemId },
        });

        // ดึงข้อมูลรายละเอียดการสั่งซื้อทั้งหมดจาก order_detail ที่เกี่ยวกับเมนูนี้
        const orderDetails = await prisma.order_detail.findMany({
          where: { itemId: menu.itemId },
        });

        return {
          menuName: item.menuName, // ชื่อเมนู
          image: item.image, // รูปภาพเมนู (ถ้ามี)
          description: item.description, // รูปภาพเมนู (ถ้ามี)
          price: item.price, // รูปภาพเมนู (ถ้ามี)
          totalCount: menu._sum.count, // ยอดขายรวม
          // รายละเอียดการสั่งซื้อของแต่ละออร์เดอร์
        };
      })
    );


    res.json(menuItemsWithNames);
  } catch (err) {
    next(err)
  }
};

