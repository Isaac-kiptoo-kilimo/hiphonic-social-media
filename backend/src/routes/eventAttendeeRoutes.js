import {Router} from 'express';
import { createEventAttendeesController, deleteEventAttendeesController, getAllEventAttendeessController, getSingleEventAttendeesController } from '../controllers/EventAttendeeControllers.js';
import {VerifyTokenMiddleware} from '../middleware/VerifyTokenMiddleware.js'


const eventAttendeeRouter=Router();

eventAttendeeRouter.post('/event/attendee', VerifyTokenMiddleware, createEventAttendeesController )

eventAttendeeRouter.get('/event/attendee', VerifyTokenMiddleware, getAllEventAttendeessController )

eventAttendeeRouter.get('/event/attendee/:EventID',VerifyTokenMiddleware, getSingleEventAttendeesController)

// eventAttendeeRouter.put('/event/attendee/:EventID',)

// eventAttendeeRouter.patch('/events/patch/:EventID',)

eventAttendeeRouter.delete('/event/attendee/delete/:EventID', VerifyTokenMiddleware, deleteEventAttendeesController)


export default eventAttendeeRouter;