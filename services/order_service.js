const prisma = require("../config/prisma");

exports.createOrderFromCart = async (customerId) => {
    try {

        const cart = await prisma.carts.findFirst({
            where: {
                customerId: customerId,
                status: 'PENDING'
            },
            include: {
                cart_Items: true,
            },
        });

        if (!cart) {
            throw new Error('Cart not found');
        }


        if (cart.cart_Items.length === 0) {
            throw new Error('No items in the cart to create an order.');
        }

        //
        const order = await prisma.orders.create({
            data: {
                customerId: cart.customerId,
                total: cart.total,
                status: 'SUCCESS', // สถานะเริ่มต้นเป็น PENDING
            },
        });



        for (const cartItem of cart.cart_Items) {
            await prisma.order_detail.create({
                data: {
                    orderId: order.id,
                    itemId: cartItem.itemId,
                    price: cartItem.price,
                    count: cartItem.count,
                    total: cartItem.total,
                },
            });
        }



        await prisma.carts.update({
            where: { id: cart.id },
            data: {
                status: 'SUCCESS', // ตั้งค่า status เป็น SUCCESS
            },
        });


        await prisma.cart_Items.deleteMany({
            where: { cartId: cart.id },
        });

        await prisma.comments.create({
            data: {
                customerId: cart.customerId,
                orderId: order.id,
                comment: '',
                status: 'PENDING',
            },
        });

        return order;
    } catch (error) {
        throw new Error("Error creating order from cart: " + error.message);
    }
};



exports.getTodaySales = async () => {
    try {
        // กำหนดวันที่ปัจจุบัน
        const today = new Date();
        today.setHours(0, 0, 0, 0); // ตั้งเวลาของวันนี้เป็น 00:00:00

        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1); // วันพรุ่งนี้เพื่อใช้ในการหา order ของวันนี้

        // ค้นหาการสั่งซื้อที่เกิดขึ้นในวันนี้
        const orders = await prisma.orders.findMany({
            where: {
                status: 'SUCCESS', // ดึง order ที่ชำระสำเร็จแล้ว
                createdAt: {
                    gte: today, // เริ่มตั้งแต่วันนี้ 00:00:00
                    lt: tomorrow, // จนถึงก่อนวันพรุ่งนี้ 00:00:00
                }
            },
        });

        // คำนวณยอดขายรวมจากรายการที่พบ
        const totalSales = orders.reduce((acc, order) => acc + Number(order.total), 0);

        return {
            ordersCount: orders.length, // จำนวน order ทั้งหมด
            totalSales, // ยอดขายรวม
        };
    } catch (error) {
        console.error('Error fetching today\'s sales:', error);
        throw new Error('Error fetching today\'s sales');
    }
};

exports.getAllOrders = async () => {
    return await prisma.orders.findMany({
        include: {
            user: {
                select: {
                    id: true,
                    firstname: true,

                }
            }
        }
    });
};

exports.updateOrderStatusById = async (orderId, newStatus) => {
    return await prisma.orders.update({
        where: { id: orderId },
        data: { status: newStatus }
    });
};

exports.deleteOrderById = async (orderId) => {
    return await prisma.orders.delete({
        where: { id: orderId }
    });
};