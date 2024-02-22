import ejs from 'ejs';

import { sendMail } from '../helpers/emailHelpers.js'
import { poolRequest } from '../utils/dbConnect.js';

export const newFriend= async()=>{

    const friends=await (await poolRequest().query(`SELECT Friendship.*,tbl_user.* 
    FROM Friendship
    INNER JOIN tbl_user ON tbl_user.userID = Friendship.User2ID
    WHERE Friendship.isFriend = 0`)).recordset

    console.log("friends",friends);

    for(let friend of friends)
{
    ejs.renderFile('templates/friendship.js', {Name: friend.Username}, async (error, data)=>{
        let mailOptions={
            from : process.env.Email ,
            to: friend.Email,
            subject: "Hey You have new Friend",
            html: data
        }
        try{
            await sendMail(mailOptions)
            await poolRequest().query('UPDATE Friendship SET isFriend = 1 WHERE isFriend = 0')

            console.log('Emails send to the new friend');
            
        }catch(error){
            console.log(error);
            
        }
    })
}    
}