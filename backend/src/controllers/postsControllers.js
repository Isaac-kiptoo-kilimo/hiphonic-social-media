import {v4} from 'uuid'
import { notAuthorized, sendCreated, sendDeleteSuccess, sendServerError} from "../helpers/helperFunctions.js"
import { createPostService, deletePostServices, getAllPostsAndCommentsService, getAllPostsService, getSinglePostServices, updateContentService, updatePostService } from '../services/postService.js';
import { createPostValidator, updateContentValidator, updatePostValidator } from '../validators/postsValidators.js';


export const createPostController = async (req, res) => {
    try {

      const {UserID,Content,Likes,Comments } = req.body;
      console.log(req.body);

      const PostID = v4();
      const { error } = createPostValidator({ Content });
      console.log("error",error);
      if (error) {
        return res.status(400).send(error.details[0].message);
      } else {
        const PostDate = new Date();    
        const createdPost = { UserID, PostID,Content,PostDate,Likes,Comments};
  
        const result = await createPostService(createdPost);
  
        if (result.message) {
          sendServerError(res, result.message)
      } else {
          sendCreated(res, 'post created successfully');
      }
      }
    } catch (error) {
      sendServerError(res, error.message);
    }
  };


  export const updatePostControllers = async (req, res) => {
    try {
      const { Content,Likes,Comments } = req.body;
      const { PostID } = req.params;
      const { UserID } = req.params;

      const PostDate = new Date();    
      const { error } = updatePostValidator({Content });
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
  
      const updatedPost = await updatePostService({ Content,PostDate,Likes,Comments, PostID,UserID });
      console.log('Updated one',updatedPost);
   
    } catch (error) {
      return sendServerError(res, 'Internal server error');
    }
  };
  

  export const updateContentControllers = async (req, res) => {
    try {
      const { Content } = req.body;
      const { PostID } = req.params;
      const { UserID } = req.params;

      const { error } = updateContentValidator({ Content});
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
  
      const updatedContent = await updateContentService({ Content, PostID, UserID });
      console.log('Updated one',updatedContent);
  
      if (updatedPost.error) {
        return sendServerError(res, updatedPost.error);
      }else{
        if(updatedPost.rowsAffected>0){
          return sendCreated(res, 'Post updated successfully');
        }else{
          res.status(400).json({message:"You are not allowed to edit This post"})
        }
      }
    } catch (error) {
      return sendServerError(res, 'Internal server error');
    }
  };
  

  export const getSingleSingleController=async(req,res)=>{
    try {
      const {PostID}=req.params
      const singlePost=await getSinglePostServices(PostID)
      if(singlePost.rowsAffected>0){
        console.log('single',singlePost.recordset);
        const onePost= singlePost.recordset
        res.status(200).json({ post: onePost });
      }else{
        res.status(400).json({ message: "There is no post available" });
      }

    } catch (error) {
      return error
    }
  }



  export const getAllPostsController = async (req, res) => {
    try {
      const results = await getAllPostsService()
      if(results.rowsAffected>0){
        const posts=results.recordset
        console.log(posts);
        res.status(200).json({ Posts: posts });
      }else{
        res.status(400).json({ message: "There are no posts" });
      }
    } catch (error) {
      console.error("Error fetching all posts:", error);
      res.status(500).json("Internal server error");
    }
  };


  export const getAllUserPostsController = async (req, res) => {
    try {
        const {UserID}=req.params
        const results = await getAllPostsAndCommentsService(UserID)
        if(results.rowsAffected>0){
        const posts=results.recordset
        console.log(posts);
        res.status(200).json({ Posts: posts });
        }else{
          res.status(400).json({ messages: "There are no post for the user" });
        }
    } catch (error) {
      console.error("Error fetching all posts:", error);
      res.status(500).json("Internal server error");
    }
  };
  

  export const deletePostController=async(req,res)=>{
    try {
      const {PostID}=req.params
      const deletedPost=await deletePostServices(PostID)
      if(deletedPost.rowsAffected>0){
        const deletedOnePost=deletedPost.recordset
        console.log('deleted post',deletedOnePost); 
        sendDeleteSuccess(res,"Deleted successfully")
      }else{
        res.status(400).json({messsage: "post does not exist or already deleted"})
      }
    } catch (error) {
      return error
    }
  }
