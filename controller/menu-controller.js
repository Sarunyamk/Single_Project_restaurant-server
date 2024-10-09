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
        image: true,
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

exports.mainMenu = async (req, res, next) => {
  try {
    const mainMenu = await prisma.menu_items.findMany({
      where: {
        categoryId: 1,
      },
      select: {
        id: true,
        menuName: true,
        price: true,
        description: true,
        image: true,
        category: {
          select: {
            id: true,
            categoryName: true
          }
        }
      }
    });

    res.json(mainMenu);
  } catch (err) {
    next(err);
  }
};

exports.saladMenu = async (req, res, next) => {
  try {
    const saladMenu = await prisma.menu_items.findMany({
      where: {
        categoryId: 2,
      },
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

    res.json(saladMenu);
  } catch (err) {
    next(err);
  }
};

exports.sandwichSanckMenu = async (req, res, next) => {
  try {
    const swAndSnackMenu = await prisma.menu_items.findMany({
      where: {
        categoryId: {
          in: [3, 4]
        }
      },
      select: {
        id: true,
        menuName: true,
        price: true,
        description: true,
        image: true,
        category: {
          select: {
            id: true,
            categoryName: true
          }
        }
      }
    });

    res.json(swAndSnackMenu);
  } catch (err) {
    next(err);
  }
};
exports.beverageMenu = async (req, res, next) => {
  try {
    const bevMenu = await prisma.menu_items.findMany({
      where: {
        categoryId: 5,
      },
      select: {
        id: true,
        menuName: true,
        price: true,
        description: true,
        image: true,
        category: {
          select: {
            id: true,
            categoryName: true
          }
        }
      }
    });

    res.json(bevMenu);
  } catch (err) {
    next(err);
  }
};

