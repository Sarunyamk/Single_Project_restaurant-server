const nodemailer = require('nodemailer');
require('dotenv').config();


const sendEmail = async (recipient, subject, message, token) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
            user: process.env.EMAIL_ADMIN,
            pass: process.env.EMAIL_PASS,
        },
    });
    console.log('recipient :>> ', recipient);
    const mailOptions = {
        from: process.env.EMAIL_ADMIN,  // ใช้ admin ในช่อง from
        to: process.env.EMAIL_ADMIN,    // ส่งถึง admin เอง
        replyTo: recipient,  // ใส่ email ลูกค้าใน replyTo เพื่อให้ Admin ตอบกลับได้
        subject: subject,
        text: `ข้อความจาก ${recipient}:\n\n${message}`,  // แจ้งผู้ส่งในเนื้อหา
    };



    // พยายามส่งอีเมลและจัดการข้อผิดพลาดหากมี
    try {
        await transporter.sendMail(mailOptions);
        return { success: true, message: 'Email sent successfully' };
    } catch (error) {
        return { success: false, message: 'Failed to send email', error };
    }
};

module.exports = sendEmail;
