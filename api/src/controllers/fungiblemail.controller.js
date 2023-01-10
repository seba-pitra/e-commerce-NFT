const nodemailer = require('nodemailer');

const sendMail = async (req, res) => {
  // let testAccount = await nodemailer.createTestAccount();
	const { correoUser, accion } = req.body;

	// create transporter SMTP transport
	let transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: "valcoellar@gmail.com", 
			pass: "rnrlnllvfcbjcvsf", 
		},
		});  

	// messages ----------------------
	if (accion == "error"){
		let info = await transporter.sendMail({
			from: '"NonFungibleTown" <andresarzate@gruponucleon.com>', 
			to: correoUser, // receivers
			subject: "Non Fungible Town", // Subject line
			text: "Some got wrong !!", // plain text body
			html: "<b>something went wrong, your payment has been declined, please try again</b>", // html body
		});
	}


	if (accion == "exito"){
		let info = await transporter.sendMail({
			from: '"NonFungibleTown" <andresarzate@gruponucleon.com>', 
			to: correoUser, // receivers
			subject: "Non Fungible Town", // Subject line
			text: "your NFT is on the way !!", // plain text body
			html: "<b>Thank you for acquiring the best of the digital market</b>", // html body
		});
	}

	if (accion == "pendiente"){
		let info = await transporter.sendMail({
			from: '"NonFungibleTown" <andresarzate@gruponucleon.com>', 
			to: correoUser, // receivers
			subject: "Non Fungible Town", // Subject line
			text: "Your transaction is pending !!", // plain text body
			html: "<b>Your transaction is in pending status, we will notify you of any changes</b>", // html body
		});
	}
	
	// -------------------------------
}


module.exports = {
	sendMail,
}
