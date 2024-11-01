const prisma = require("../config/prisma")
const createError = require("../utils/createError")

const { getOrdersByUserId, getHistorysByUserId, getAllCommentByrating, getMenuItemComments } = require("../services/comment-service")

// get orders เพื่อให้ลูกค้าคอมเมนท์ สำหรับ ออเดอร์ที่ชำระเงินแล้วเท่านั้น นาจา
exports.getOrders = async (req, res, next) => {
    try {
        const { customerId } = req.params;
        const orders = await getOrdersByUserId(customerId);

        res.json(orders);
    } catch (err) {
        next(err);
    }
};
exports.getHistory = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const orders = await getHistorysByUserId(userId);

        res.json(orders);
    } catch (err) {
        next(err);
    }
};

exports.updateCommentStatus = async (req, res, next) => {
    try {
        const { comments } = req.body;
        const customerId = req.user.id;

        for (const data of comments) {
            // ค้นหาคอมเมนต์ที่มีสถานะ PENDING
            const existingPendingComment = await prisma.comments.findFirst({
                where: {
                    orderId: data.orderId,
                    customerId: customerId,
                    status: 'PENDING'
                }
            });

            if (!existingPendingComment) {
                return res.status(400).json({ message: 'Pending comment not found for order' });
            }

            // อัปเดตคอมเมนต์และเปลี่ยนสถานะเป็น SUCCESS
            await prisma.comments.update({
                where: { id: existingPendingComment.id },
                data: {
                    comment: data.comment,
                    rating: data.rating,
                    status: 'SUCCESS'
                }
            });
        }

        res.json({ message: 'Comments updated and status changed to SUCCESS' });
    } catch (err) {
        console.error("Error updating comments:", err);
        next(err);
    }
};



// show comment ที่ลูกค้าคอมเมนท์ เฉพาะ rating good
exports.getAllComments = async (req, res, next) => {
    try {
        const comments = await getAllCommentByrating()

        if (!comments || comments.length === 0) {
            return createError(404, 'No comment found');
        }

        res.json(comments);
    } catch (err) {
        next(err)
    }
};




exports.ShowCommentReview = async (req, res, next) => {
    const { itemId } = req.params;  // รับ itemId จาก URL

    try {
        const comments = await getMenuItemComments(parseInt(itemId, 10));

        if (!comments || comments.length === 0) {
            return createError(404, 'No comment found');
        }

        res.json(comments);
    } catch (err) {
        next(err);
    }
};