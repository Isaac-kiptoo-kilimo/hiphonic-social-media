import {Router} from 'express';
import { createGroupController, deleteGroupControllers, getAllGroupsController, getSingleGroupController, updateGroupControllers, updateGroupNameControllers } from '../controllers/groupControllers.js';
import {VerifyTokenMiddleware} from '../middleware/VerifyTokenMiddleware.js'


const groupRouter=Router();

groupRouter.post('/groups',VerifyTokenMiddleware, createGroupController)

groupRouter.get('/groups', VerifyTokenMiddleware, getAllGroupsController)

groupRouter.get('/groups/single/:GroupID', VerifyTokenMiddleware, getSingleGroupController )

groupRouter.put('/groups/update/:GroupID', VerifyTokenMiddleware, updateGroupControllers)

groupRouter.patch('/groups/patch/:GroupID', VerifyTokenMiddleware, updateGroupNameControllers)

groupRouter.delete('/groups/delete/:GroupID', VerifyTokenMiddleware, deleteGroupControllers)


export default groupRouter;