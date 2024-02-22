import {Router} from 'express';
import { createMessageController, deleteMessageController, getAllMessagesController, getSingleMessageController, updateContentControllers, updateMessageControllers } from '../controllers/messageControllers.js';
import {VerifyTokenMiddleware} from '../middleware/VerifyTokenMiddleware.js'

const messageRouter=Router();

messageRouter.post('/messages', VerifyTokenMiddleware, createMessageController)

messageRouter.get('/messages', VerifyTokenMiddleware, getAllMessagesController )

messageRouter.get('/messages/single/:MessageID', VerifyTokenMiddleware, getSingleMessageController)

messageRouter.put('/messages/update/:MessageID', VerifyTokenMiddleware, updateMessageControllers)

messageRouter.patch('/messages/patch/:MessageID', VerifyTokenMiddleware, updateContentControllers)

messageRouter.delete('/messages/delete/:MessageID', VerifyTokenMiddleware, deleteMessageController)


export default messageRouter;