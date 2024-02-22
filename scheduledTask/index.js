import express from 'express';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer'
import logger from './loggers.js'
import {emailTemp} from './emailTemplate.js'
import cron from 'node-cron'

const app=express();

dotenv.config();

const sendMail=async()=>{
   let transporter=nodemailer.createTransport({
        service: 'gmail',
        auth:{
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    })
    
    const mailOptions={
        from: process.env.EMAIL,
        to:'isaackilimok1@gmail.com',
        Subject: 'Sending Email using Node.js',
        html: emailTemp
        // text: 'That was easy sending mails from express api with nodemailer'
    };

    try {
        logger.info('sending mail ...')
        await transporter.sendMail(mailOptions,(error,info)=>{
            if(error){
                logger.error(error);
            }else{
                logger.info(`Email sent:${info.response}`)
                res.status(500).send(error)
            }
        })
    } catch (error) {
        return error
    }
}


const PORT=process.env.PORT || 5000

// # ┌────────────── second (optional)
// # │ ┌──────────── minute
// # │ │ ┌────────── hour
// # │ │ │ ┌──────── day of month
// # │ │ │ │ ┌────── month
// # │ │ │ │ │ ┌──── day of week
// # │ │ │ │ │ │
// # │ │ │ │ │ │
// # * * * * * *

cron.schedule('*/5 * * * * *', () => {
    sendMail()
    console.log('running a task every minute');
  });


// app.get('/mail',async(req,res)=>{

// })

app.listen(PORT,()=>{
    logger.info(`This App is running on port : ${PORT}`);
})