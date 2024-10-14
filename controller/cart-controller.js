const prisma = require("../config/prisma")
const createError = require("../utils/createError")
const { findCartsByCustomerId, createCart, getCartByCustomerId } = require("../services/cart-service")
const { findCartItemByItemId, updateCartItem, createCartItem } = require("../services/cart_Item-service")


exports.createCart = async (req, res, next) => {
    try {
        const { customerId, items } = req.body;

        const existingCart = await findCartsByCustomerId(customerId)

        let cart = null;

        if (!existingCart) {
            // Create a new cart
            cart = await createCart({
                customerId: customerId,
                total: 0,
                status: 'PENDING',
            });
        }

        const idd = cart?.id || existingCart.id;

        // Check for existing cart item in the specific cart
        const findCartItems = await findCartItemByItemId(items.itemId, idd); // Make sure you pass `cartId`

        let updatedCartItems;
        let cartItem;

        if (findCartItems) {
            // Update item quantity
            updatedCartItems = await updateCartItem(findCartItems, items);
        } else {
            // Create new cart item
            cartItem = await createCartItem(items, idd);
        }

        // Return the cart item that was updated or newly created
        const returnResp = cartItem || updatedCartItems;

        // Aggregate total cart value
        const { _sum } = await prisma.cart_Items.aggregate({
            _sum: {
                total: true
            },
            where: {
                cartId: idd
            }
        });

        console.log(_sum.total, "totalAmount");

        // Update total in the carts table
        await prisma.carts.update({
            where: { id: idd },
            data: { total: _sum.total || 0 }, // Handle case where no total is found
        });

        res.status(201).json({ message: 'Cart created successfully', returnResp });
    } catch (err) {
        next(err);
    }
};


exports.getCart = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const cart = await getCartByCustomerId(userId);

        if (!cart) {
            return createError(404, "Cart not found");
        }

        res.json(cart);
    } catch (err) {
        next(err);
    }
};

exports.deleteCartItem = async (req, res, next) => {

    try {
        const { cartItemId } = req.params
        const cartItem = await prisma.cart_Items.findUnique({
            where: {
                id: Number(cartItemId),
            },
        });

        if (!cartItem) {
            return res.status(404).json({ message: 'Cart item not found' });
        }

        const cartId = cartItem.cartId;

        await prisma.cart_Items.delete({
            where: {
                id: Number(cartItemId)
            }
        })

        const { _sum } = await prisma.cart_Items.aggregate({
            _sum: {
                total: true,
            },
            where: {
                cartId: cartId,
            },
        });

        await prisma.carts.update({
            where: {
                id: cartId
            },
            data: {
                total: _sum.total || 0
            }, // ถ้าไม่มี item เหลือใน cart ให้ตั้งค่าเป็น 0
        });

        res.json({ message: `delete item ${cartItemId} success` })
    } catch (err) {
        next(err)
    }
}

exports.updateCartItem = async (req, res, next) => {
    try {
        const { cartItemId } = req.params;
        const { count, price } = req.body;

        // คำนวณราคาทั้งหมดใหม่
        const total = count * price;

        // อัปเดตข้อมูลในฐานข้อมูล
        const updatedCartItem = await prisma.cart_Items.update({
            where: {
                id: Number(cartItemId),
            },
            data: {
                count: count,
                total: total,
            },
        });

        // อัปเดทยอดรวมในตาราง cart
        const { cartId } = updatedCartItem;
        const { _sum } = await prisma.cart_Items.aggregate({
            _sum: {
                total: true,
            },
            where: {
                cartId: cartId,
            },
        });

        await prisma.carts.update({
            where: { id: cartId },
            data: { total: _sum.total || 0 },
        });

        res.json({ message: "Cart item updated successfully", updatedCartItem });
    } catch (err) {
        next(err)
    }
};

