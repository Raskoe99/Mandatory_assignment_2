import nodemailer from "nodemailer"

let transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: "furnitureAndYou@outlook.com",
        pass: "Furniture99", // generated ethereal password
    }
})

export default transporter

