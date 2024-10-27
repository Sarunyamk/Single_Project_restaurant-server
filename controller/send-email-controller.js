const nodemailer = require('nodemailer');

const sendEmail = require('../utils/email-services');


exports.sendEmailController = async (req, res) => {
    const { recipient, subject, message } = req.body;

    if (!recipient || !subject || !message) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }

    try {
        const { success, message: responseMessage, error } = await sendEmail(recipient, subject, message);

        if (success) {
            res.status(200).json({ message: responseMessage });
        } else {
            res.status(500).json({ message: responseMessage, error });
        }
    } catch (error) {

        res.status(500).json({ message: 'Internal server error', error });
    }

};
