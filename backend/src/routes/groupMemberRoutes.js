import {Router} from 'express';
import { createGroupMembersController, deleteGroupMembersControllers, getAllGroupMembersController, getSingleGroupMembersController } from '../controllers/groupMembers.js';
import {VerifyTokenMiddleware} from '../middleware/VerifyTokenMiddleware.js'


const groupMemberRouter=Router();

groupMemberRouter.post('/members', VerifyTokenMiddleware, createGroupMembersController)

groupMemberRouter.get('/members', VerifyTokenMiddleware,  getAllGroupMembersController)

groupMemberRouter.get('/members/single/:GroupID', VerifyTokenMiddleware, getSingleGroupMembersController )

// groupMemberRouter.put('/members/update/:GroupMemberID', )

// groupMemberRouter.patch('/members/patch/:GroupMemberID', )

groupMemberRouter.delete('/members/delete/:GroupID', VerifyTokenMiddleware, deleteGroupMembersControllers)


export default groupMemberRouter;