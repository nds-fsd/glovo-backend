const nodemailer = require("nodemailer");
const ejs = require("ejs");
const singUpHTML = require('../mailer/htmlTemplates/singUpTemplate');
const orderCompleteHTML = require('../mailer/htmlTemplates/orderCompleteTemplate');
require("dotenv").config();

const transporter = nodemailer.createTransport({
    port: 465,            
    host: "smtp.gmail.com",
    auth: {
        user: process.env.THE_EMAIL,
        pass: process.env.THE_PASSWORD,
    },
    secure: true,
});

function wrapedSendMail(mailOptions) {
	return new Promise((resolve, reject) => {
        mailOptions.from = process.env.THE_EMAIL;

		transporter.sendMail(mailOptions, function (error, info) {
			if (error) {
				throw new Error(error);
			} else {
				resolve(info);
			}
		});
	})
}
const sendSignUpEmail = (data, toEmail) => {
	const html = ejs.render(singUpHTML, {data});
	const mailData = {
		to: toEmail,
		html,
		subject: "Welcome to Globo",
	};

	return wrapedSendMail(mailData);
}
const sendOrderCompleteEmail = (data, toEmail) => {
	const html = ejs.render(orderCompleteHTML, {data});
	const mailData = {
		to: toEmail,
		html,
		subject: "We are preparing your order!",
	};

	return wrapedSendMail(mailData);
}



module.exports = {
	sendSignUpEmail,
    sendOrderCompleteEmail
}