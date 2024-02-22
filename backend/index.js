import express from 'express';
// import express, { Request,Response,json, NextFunction } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import logger from './src/utils/loggers.js'
import userRouter from './src/routes/usersRoutes.js';
import cors from 'cors'
import rateLimitMiddleware from './src/middleware/rateLimitMiddleware.js';
import postRouter from './src/routes/postsRoutes.js';
import photoRouter from './src/routes/photosRoutes.js';
import groupRouter from './src/routes/groupRoutes.js';
import commentRouter from './src/routes/commentRoutes.js';
import eventRouter from './src/routes/EventRoutes.js';
import messageRouter from './src/routes/messageRoutes.js';
import friendshipRouter from './src/routes/FriendshipRoutes.js';
import groupMemberRouter from './src/routes/groupMemberRoutes.js';
import eventAttendeeRouter from './src/routes/eventAttendeeRoutes.js';

const app=express();

dotenv.config();
const PORT=process.env.PORT || 5000


var corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
// Middlewares should come before the apis|routes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions))
rateLimitMiddleware(app);



app.use((error,req,res,next)=>{
    res.json({
        message:error
    })

})


app.use('/api/v1',userRouter)
app.use('/api/v1',postRouter)
app.use('/api/v1',photoRouter)
app.use('/api/v1',groupRouter)
app.use('/api/v1',commentRouter)
app.use('/api/v1',eventRouter)
app.use('/api/v1',eventAttendeeRouter)
app.use('/api/v1',messageRouter)
app.use('/api/v1',friendshipRouter)
app.use('/api/v1',groupMemberRouter)


app.listen(PORT,()=>{
    logger.info(`This App is running on port : ${PORT}`);
})