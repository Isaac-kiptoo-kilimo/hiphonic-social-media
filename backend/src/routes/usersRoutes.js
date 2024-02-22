import {Router} from 'express';
import { createNewUserController, deleteUserController, getAllUsersController, getSingleUserController, loginUserController, updateUserControllers, updateUserPasswordControllers } from '../controllers/usersControllers.js';
import {VerifyTokenMiddleware} from '../middleware/VerifyTokenMiddleware.js'
const userRouter=Router();

userRouter.post('/users/register', createNewUserController)

userRouter.post('/users/login', loginUserController)

userRouter.get('/users' , VerifyTokenMiddleware , getAllUsersController)

userRouter.get('/users/single/:UserID', VerifyTokenMiddleware ,getSingleUserController)

userRouter.put('/users/update/:UserID',VerifyTokenMiddleware,updateUserControllers)

userRouter.patch('/users/patch/:UserID',VerifyTokenMiddleware,updateUserPasswordControllers)

userRouter.delete('/users/delete/:UserID',VerifyTokenMiddleware,deleteUserController)


export default userRouter;