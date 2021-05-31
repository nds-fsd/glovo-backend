const nodemailer = require("nodemailer");
const express = require("express");
const ejs = require("ejs");
require("dotenv").config();

async function wrapedSendMail(mailOptions) {

	return new Promise((resolve, reject) => {

		const transporter = nodemailer.createTransport({
			port: 465,            
			host: "smtp.gmail.com",
			auth: {
				user: process.env.THE_EMAIL,
				pass: process.env.THE_PASSWORD,
			},
			secure: true,
		});
		transporter.sendMail(mailOptions, function (error, info) {
			if (error) {
				throw new Error(error);
			} else {
				resolve(info);
			}
		});
	})
}

const sendEmail = (data, htmlTemplate, from, to, subject ) => {
	const html = ejs.render(htmlTemplate, {data});
		const mailData = {
			from,  // sender address
			to,   // list of receivers
			subject,
			html
		};
		const response = wrapedSendMail(mailData);
		return response;
};

module.exports = {
	sendEmail
}