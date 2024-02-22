import {Router} from 'express';
import { createEventController, deleteEventController, getAllEventsController, getAllUserEventController, getSingleEventController, updateEventControllers, updateEventNameControllers } from '../controllers/eventsControllers.js';
import {VerifyTokenMiddleware} from '../middleware/VerifyTokenMiddleware.js'

const eventRouter=Router();

eventRouter.post('/events', VerifyTokenMiddleware, createEventController )

eventRouter.get('/events', VerifyTokenMiddleware, getAllEventsController )

eventRouter.get('/events/single/:EventID', VerifyTokenMiddleware, getSingleEventController)
eventRouter.get('/events/users/:attendeeID', VerifyTokenMiddleware, getAllUserEventController)

eventRouter.put('/events/update/:EventID', VerifyTokenMiddleware,updateEventControllers)

eventRouter.patch('/events/patch/:EventID', VerifyTokenMiddleware, updateEventNameControllers)

eventRouter.delete('/events/delete/:EventID', VerifyTokenMiddleware, deleteEventController)


export default eventRouter;