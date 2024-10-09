

const prisma = require("../config/prisma")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const createError = require("../utils/createError")
const userService = require("../services/user-service")


exports.register = async (req, res, next) => {

    try {

        const { firstname, lastname,
            phonenumber, address,
            email, password } = req.body


        const user = await userService.getUserByEmail(email)

        if (user) {

            return createError(400, "Email already exist!!")
        }

        const hashPassword = await bcryptjs.hash(password, 10);

        const newUser = await prisma.user.create({

            data: {
                firstname, lastname,
                phonenumber, address,
                email,
                password: hashPassword
            }
        })


        res.json({ newUser })

    } catch (err) {

        next(err)
    }
}

exports.login = async (req, res, next) => {

    try {

        const { email, password } = req.body


        const user = await userService.getUserByEmail(email)
        if (!user) {

            return createError(400, "User not found!!")
        }

        const checkPassword = await bcryptjs.compare(password, user.password)

        if (!checkPassword) {

            return createError(400, "Wrong password!!")
        }
        //create payload
        const payLoad = {
            user: {
                id: user.id,
                firstname: user.firstname,
                email: user.email,
                role: user.role
            }
        }

        //create token
        const genToken = jwt.sign(payLoad, process.env.JWT_SECRET, { expiresIn: "1d" })


        //send to frontend

        res.json({
            user: payLoad,
            token: genToken
        })



    } catch (err) {

        next(err)
    }
}

exports.currentUser = async (req, res, next) => {

    try {

        const email = req.user.user.email
        const user = await userService.getCurrentUserByEmail(email)

        console.log(user)
        res.json({ user })
    } catch (err) {

        next(err)
    }
}

const sendResetEmail = async (email, token) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Reset Your Password',
        text: `คลิกที่ลิงก์นี้เพื่อรีเซ็ตรหัสผ่านของคุณ: http://localhost:5173/reset-password/${token}`,
    };

    await transporter.sendMail(mailOptions);
};

exports.forgetPassword = async (req, res, next) => {
    try {
        const { email } = req.body;
        console.log(req.body, "fdgdfgdf")
        const user = await userService.getUserByEmail(email)
        console.log('user :>> ', user);

        if (!user) {
            return createError(404, 'อีเมลไม่ถูกต้อง');
        }

        const token = crypto.randomBytes(20).toString('hex');

        console.log('token :>> ', token);
        const expiry = new Date(Date.now() + 3600000);

        await prisma.user.update({
            where: { email },
            data: {
                resetToken: token,
                resetTokenExpiry: expiry,
            },
        });

        await sendResetEmail(email, token);
        console.log("object")

        res.json({ message: 'ส่งลิงก์รีเซ็ตรหัสผ่านไปยังอีเมลแล้ว', tokenEmail: token });
    } catch (error) {
        next(error);
    }
};

exports.resetPassword = async (req, res, next) => {
    try {
        const { token } = req.params;

        console.log('token :>> ', req.params);
        const { password } = req.body;

        const user = await prisma.user.findFirst({
            where: {
                resetToken: token,
                resetTokenExpiry: {
                    gt: new Date(),
                },
            },
        });

        if (!user) {
            return res.status(400).json({ message: 'Token ไม่ถูกต้องหรือหมดอายุ' });
        }

        const hashedPassword = await bcryptjs.hash(password, 10);

        await prisma.user.update({
            where: { id: user.id },
            data: {
                password: hashedPassword,
                resetToken: null,
                resetTokenExpiry: null,
            },
        });

        res.json({ message: 'รีเซ็ตรหัสผ่านสำเร็จแล้ว' });
    } catch (error) {
        next(error);
    }
};