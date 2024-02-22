import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config();


function createTransport(config){

    const transporter=nodemailer.createTransport(config)

    return transporter

}

let configurations=({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: process.env.EMAIL ,
        pass: process.env.PASSWORD 
    }
})

export const sendMail= async (messageOption)=>{
    const transporter=await createTransport(configurations)

    await transporter.verify()
    await transporter.sendMail(messageOption, (error, info)=>{
        if(error){
            console.log(error);
            
        }else{
            console.log((info.response));
            
        }
    })
}