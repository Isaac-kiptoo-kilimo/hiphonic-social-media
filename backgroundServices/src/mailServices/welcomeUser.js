import ejs from 'ejs';

import { sendMail } from '../helpers/emailHelpers.js'
import { poolRequest } from '../utils/dbConnect.js';

export const welcomeUser= async()=>{

    const users=await (await poolRequest().query('SELECT * FROM tbl_user WHERE welcomed=0')).recordset

    console.log("users",users);

    for(let user of users)
{
    ejs.renderFile('templates/welcomeUser.ejs', {Name: user.Username}, async (error, data)=>{
        let mailOptions={
            from : process.env.Email ,
            to: user.Email,
            subject: "Welcome To our social  Media and enjoy it !",
            html: data
        }
        try{
            await sendMail(mailOptions)
            await poolRequest().query('UPDATE tbl_user SET welcomed = 1 WHERE welcomed = 0')

            console.log('Emails send to new Users');
            
        }catch(error){
            console.log(error);
            
        }
    })
}    
}