import {Router} from 'express';
import { createPostController, deletePostController, getAllPostsController, getAllUserPostsController, getSingleSingleController, updateContentControllers, updatePostControllers } from '../controllers/postsControllers.js';
import { VerifyTokenMiddleware } from '../middleware/VerifyTokenMiddleware.js';

const postRouter=Router();

postRouter.post('/posts',createPostController )

postRouter.get('/posts', VerifyTokenMiddleware, getAllPostsController )
postRouter.get('/user/posts/:UserID', VerifyTokenMiddleware, getAllUserPostsController )


postRouter.get('/posts/single/:PostID', VerifyTokenMiddleware, getSingleSingleController)

postRouter.put('/posts/update/:UserID/:PostID', VerifyTokenMiddleware, updatePostControllers)

postRouter.patch('/posts/patch/:PostID', VerifyTokenMiddleware ,updateContentControllers)

postRouter.delete('/posts/delete/:PostID', VerifyTokenMiddleware, deletePostController)


export default postRouter;