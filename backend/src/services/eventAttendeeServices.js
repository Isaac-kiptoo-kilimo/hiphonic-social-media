
import dotenv from 'dotenv'

import {poolRequest,sql} from '../utils/dbConnect.js'

dotenv.config();



// Register post service
export const createEventAttendeeService=async(EventAttendee)=>{
  
  try {
    const result=await poolRequest()
    .input('EventID', sql.VarChar,EventAttendee.EventID )
    .input('AttendeeID', sql.VarChar,EventAttendee.AttendeeID)
    .query('INSERT INTO EventAttendee (EventID,AttendeeID) VALUES(@EventID,@AttendeeID)')
    console.log('results',result);
    return result;

  } catch (error) {
    return error
  }
};


// // updating post details based on the id

// export const updateEventAttendeeService=async(updateEvent)=>{
//   try {
//     const updatedEvent=await poolRequest()
//     .input('EventID', sql.VarChar,updateEvent.EventID )
//   .query(`UPDATE Event  SET EventID=@EventID, Description=@Description,Location=@Location, EventDate = @EventDate  WHERE  EventID = @EventID`)
// console.log(updatedEvent);
//   return updatedEvent
  
//   } catch (error) {
//     return error
//   }
// }


export const getSingleEventAttendeeServices=async(EventID)=>{
  const singleEventAttendees= await poolRequest()
  .input('EventID', sql.VarChar,EventID)
  .query('SELECT * FROM EventAttendee WHERE EventID = @EventID ')
  console.log('single eventAttendees',singleEventAttendees.recordset);
  return singleEventAttendees.recordset;
}


// Fetching all available attandee in the database
export const getAllEventAttendeesService=async()=>{
    try {
        const allEventAttendees=await poolRequest().query(`SELECT * FROM EventAttendee`)
        return allEventAttendees
    } catch (error) {
        return error
    }
}

// Fetching delete event attandee
export const deleteEventAttendeesServices=async(EventID)=>{
  const deletedEventAttendee= await poolRequest()
  .input('EventID', sql.VarChar,EventID)
  .input('AttendeeID', sql.VarChar,AttendeeID)
  .query('DELETE FROM Event WHERE EventID = @EventID AND AttendeeID = @AttendeeID ')
  console.log('single EventID',deletedEventAttendee.recordset);
  return deletedEventAttendee.recordset;
}

