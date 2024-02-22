import {Router} from 'express';
import { createCommentController, deleteCommentController, getAllCommentsController, getSingleCommentController, updateCommentControllers, updateContentControllers } from '../controllers/commentController.js';
import {VerifyTokenMiddleware} from '../middleware/VerifyTokenMiddleware.js'

const commentRouter=Router();

commentRouter.post('/comments', VerifyTokenMiddleware, createCommentController)

commentRouter.get('/comments', VerifyTokenMiddleware, getAllCommentsController)

commentRouter.get('/comments/single/:CommentID', VerifyTokenMiddleware,getSingleCommentController)

commentRouter.put('/comments/update/:CommentID',VerifyTokenMiddleware, updateCommentControllers)

commentRouter.patch('/comments/patch/:CommentID',VerifyTokenMiddleware, updateContentControllers)

commentRouter.delete('/comments/delete/:CommentID',VerifyTokenMiddleware, deleteCommentController)


export default commentRouter;