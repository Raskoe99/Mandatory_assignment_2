import { Router } from "express"
import transporter from "../mails/mailer.js"

const mailRouter = Router()

mailRouter.post("/mail/send", (req, res) => {
    const from = req.body.fromEmail
    const receiveEmail = req.body.receiveEmail
    const subject = req.body.subject
    const text = req.body.text
  
    const mailOptions = {
        from: from,
        to: receiveEmail,
        subject: subject,
        text: text
    }

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            res.send( { passed : false } )
            console.log(info)
        } else {
            res.send( { passed : true } )
        }
    })
})

export default mailRouter
