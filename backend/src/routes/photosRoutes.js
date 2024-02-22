import {Router} from 'express';
import { createPhotoController, deletePhotoController, getAllPhotosController, getSinglePhotoController, updatePhotoControllers, updatePhotoUrlControllers } from '../controllers/photosControllers.js';
import { VerifyTokenMiddleware } from '../middleware/VerifyTokenMiddleware.js';

const photoRouter=Router();

photoRouter.post('/photos', VerifyTokenMiddleware, createPhotoController)

photoRouter.get('/photos', VerifyTokenMiddleware, getAllPhotosController )

photoRouter.get('/photos/single/:PhotoID', VerifyTokenMiddleware, getSinglePhotoController)

photoRouter.put('/photos/update/:PhotoID', VerifyTokenMiddleware, updatePhotoControllers)

photoRouter.patch('/photos/patch/:PhotoID', VerifyTokenMiddleware, updatePhotoUrlControllers)

photoRouter.delete('/photos/delete/:PhotoID', VerifyTokenMiddleware, deletePhotoController)


export default photoRouter;