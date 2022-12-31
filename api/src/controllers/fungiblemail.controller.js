const nodemailer = require('nodemailer');



async function sendMail() {
  // let testAccount = await nodemailer.createTestAccount();

	// create transporter SMTP transport
	let transporter = nodemailer.createTransport({
		host: "mail.gruponucleon.com",
		port: 587,
		secure: false, // true for 465, false for other ports
		auth: {
			user: "andresarzate@gruponucleon.com", 
			pass: "Henry-Nodejs-2022", 
		},
		tls:{ 
			secure: false,
			ignoreTLS: true,
			rejectUnauthorized: false
		},
	});  
	
	// messages ----------------------

	let info = await transporter.sendMail({
		from: '"NonFungibleTown" <andresarzate@gruponucleon.com>', 
		to: "direccion@gruponucleon.com", // receivers
		subject: "Hello world26", // Subject line
		text: "Hello world? all works fine!!", // plain text body
		html: "<b>Se puede incluir html?</b>", // html body
	});

	// -------------------------------
}


module.exports = {
	sendMail,

}
