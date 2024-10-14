const prisma = require("../config/prisma")
const createError = require("../utils/createError")

const { getOrdersByUserId, getAllCommentByrating } = require("../services/comment-service")

// get orders เพื่อให้ลูกค้าคอมเมนท์ สำหรับ ออเดอร์ที่ชำระเงินแล้วเท่านั้น นาจา
exports.getOrders = async (req, res, next) => {
    try {
        const { customerId } = req.params;
        const orders = await getOrdersByUserId(customerId)
        res.json(orders);
    } catch (err) {
        next(err)
    }
};



exports.addCommentsToOrders = async (req, res, next) => {
    try {
        const { comments } = req.body;
        const customerId = req.user.id;

        if (!comments || comments.length === 0) {
            return res.status(400).json({ message: 'Comment is required' });
        }

        for (const data of comments) {
            if (!data.orderId || !data.comment || !data.rating) {
                return res.status(400).json({ message: 'orderId, comment, and rating are required' });
            }

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

            if (!['GOOD', 'AVERAGE', 'BAD'].includes(data.rating)) {
                return res.status(400).json({ message: 'Invalid rating' });
            }


            await prisma.comments.update({
                where: { id: existingPendingComment.id },
                data: {
                    comment: data.comment,
                    rating: data.rating,
                    status: 'SUCCESS'
                }
            });
        }

        res.json({ message: 'Update comment success' });
    } catch (err) {
        next(err)
    }
};


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
