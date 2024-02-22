import express from 'express';
import dotenv from 'dotenv';
import logger from './src/utils/loggers.js'
import { welcomeUser } from './src/mailServices/welcomeUser.js';
import { newFriend } from './src/mailServices/friendship.js'
import cron from 'node-cron'

dotenv.config();
const app=express();
// let transporter=nodemailer.createTransport({
//     service: 'gmail',
//     auth:{
//         user: process.env.EMAIL,
//         pass: process.env.PASSWORD
//     }
// })

// const mailOptions={
//     from: process.env.EMAIL,
//     to:'isaackilimok1@gmail.com',
//     Subject: 'Sending Email using Node.js',
//     html: emailTemp
//     // text: 'That was easy sending mails from express api with nodemailer'
// }


const PORT=process.env.PORT || 5000


// app.get('/mail',async(req,res)=>{
// try {
    
//     logger.info('sending mail ...')
//     await transporter.sendMail(mailOptions,(error,info)=>{
//         if(error){
//             logger.error(error);
//         }else{
//             logger.info(`Email sent:${info.response}`)
//             res.status(500).send(error)
//         }
//     })
// } catch (error){
//     return error
// }
// })



const run = async()=>{
    cron.schedule('*/10 * * * * *', async()=>{
        console.log('Checking for a new user');
        
        await welcomeUser()
        await newFriend()
        // console.log(welcomeUser());
    })
    
}

run()

app.listen(PORT,()=>{
    logger.info(`This App is running on port : ${PORT}`);
})