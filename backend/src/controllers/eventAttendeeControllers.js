import {v4} from 'uuid'
import {  sendCreated, sendDeleteSuccess, sendServerError} from "../helpers/helperFunctions.js"
import { createEventAttendeeService, deleteEventAttendeesServices, getAllEventAttendeesService, getSingleEventAttendeeServices } from '../services/eventAttendeeServices.js';
import { createEventAttendeeValidator } from '../validators/eventAttendees.js';


export const createEventAttendeesController = async (req, res) => {
    try {
      const { EventID,AttendeeID } = req.body;
      console.log(req.body);
            
      const { error } = createEventAttendeeValidator( req.body);
      console.log("error",error);
      if (error) {
        return res.status(400).send(error.details[0].message);
      } else {
        const createdEventAttendees = { EventID,AttendeeID};
  
        const result = await createEventAttendeeService(createdEventAttendees);
  
        if (result.message) {
          sendServerError(res, result.message)
      } else {
          sendCreated(res, 'Event allocated attendees successfully created successfully');
      }
      }
    } catch (error) {
      sendServerError(res, error.message);
    }
  };


  // export const updateEventAttendeesControllers = async (req, res) => {
  //   try {
  //     const { Description,Location,EventDate } = req.body;
  //     const { EventID } = req.params;
  //     const { error } = updateEventValidator({Description,Location,EventDate });
  //     if (error) {
  //       return res.status(400).json({ error: error.details[0].message });
  //     }
  
  //     const updatedEvent = await updateEventService({Description,Location,EventDate, EventID });
  //     console.log('Updated one',updatedEvent);
  //     if (updatedEvent.error) {
  //       return sendServerError(res, updatedEvent.error);
  //     }
  
  //     return sendCreated(res, 'Event updated successfully');
  //   } catch (error) {
  //     return sendServerError(res, 'Internal server error');
  //   }
  // };
  
  

  export const getSingleEventAttendeesController=async(req,res)=>{
    try {
      const {EventID}=req.params
      const singleEventAttendees=await getSingleEventAttendeeServices(EventID)
      
      console.log('single',singleEventAttendees); 
      res.status(200).json({ eventAttendee: singleEventAttendees });

    } catch (error) {
      return error
    }
  }



  export const getAllEventAttendeessController = async (req, res) => {
    try {
      const results = await getAllEventAttendeesService()
        const eventsAttendees=results.recordset
        console.log(eventsAttendees);
      res.status(200).json({ eventsAttendees: eventsAttendees });
    } catch (error) {
      console.error("Error fetching all events:", error);
      res.status(500).json("Internal server error");
    }
  };
  

  export const deleteEventAttendeesController=async(req,res)=>{
    try {
      const {EventID}=req.params
      const deletedEventAttendee=await deleteEventAttendeesServices(EventID)
      console.log('deleted event',deletedEventAttendee); 
      sendDeleteSuccess(res,"Deleted successfully")
    } catch (error) {
      return error
    }
  }
