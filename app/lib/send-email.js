"use server"

import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  host: "smtp.office365.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "adrian.tamez@linum.mx",
    pass: "@Admin*01",
  },
});


export default async function SendEmail(email, emailBody){

    try{

    const info = await transporter.sendMail({
        from: '"Adrian" <adrian.tamez@linum.mx>', // sender address
        to: email, // list of receivers
        subject: "You have an Invitation", // Subject line
        /* text: "Hello world?", */ // plain text body
        html: emailBody, // html body
      });
      return (info)

    } catch(err){
        console.log(err)
        return (err)
    }
}

