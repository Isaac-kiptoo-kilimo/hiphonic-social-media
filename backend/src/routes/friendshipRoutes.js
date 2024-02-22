import {Router} from 'express';
import { createFriendshipController, deleteFriendshipController, getAllFriendshipsController, getAllUserFriendshipsController, getSingleFriendshipController, updateFriendshipControllers } from '../controllers/friendshipController.js';
import {VerifyTokenMiddleware} from '../middleware/VerifyTokenMiddleware.js'

const friendshipRouter=Router();

friendshipRouter.post('/friendships',VerifyTokenMiddleware, createFriendshipController)

friendshipRouter.get('/friendships', VerifyTokenMiddleware, getAllFriendshipsController)

friendshipRouter.get('/friendships/single/:FriendshipID', VerifyTokenMiddleware, getSingleFriendshipController)
friendshipRouter.get('/user/friendships/:User1ID',VerifyTokenMiddleware, getAllUserFriendshipsController)

// friendshipRouter.put('/friendships/update/:FriendshipID', updateFriendshipControllers)

friendshipRouter.patch('/friendships/patch/:FriendshipID',VerifyTokenMiddleware, updateFriendshipControllers)

friendshipRouter.delete('/friendships/delete/:FriendshipID',VerifyTokenMiddleware,  deleteFriendshipController)


export default friendshipRouter;