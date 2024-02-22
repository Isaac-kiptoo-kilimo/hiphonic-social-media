import {v4} from 'uuid'
import { notAuthorized, sendCreated, sendDeleteSuccess, sendServerError} from "../helpers/helperFunctions.js"
import { createCommentService, deleteCommentServices, getAllCommentsService, getSingleCommentServices, updateCommentService, updateContentService } from '../services/commentServices.js';
import { createCommentValidator, updateCommentValidator, updateContentValidator } from '../validators/commentValidators.js';


export const createCommentController = async (req, res) => {
    try {

      const {UserID,PostID,Content } = req.body;
      console.log(req.body);
     
      
      const CommentID = v4();
      const { error } = createCommentValidator({ Content });
      console.log("error",error);
      if (error) {
        return res.status(400).send(error.details[0].message);
      } else {
        const CommentDate = new Date();    
        const createdComment = { CommentID,UserID, PostID,Content,CommentDate};
  
        const result = await createCommentService(createdComment);
  
        if (result.message) {
          sendServerError(res, result.message)
      } else {
          sendCreated(res, 'comment created successfully');
      }
      }
    } catch (error) {
      sendServerError(res, error.message);
    }
  };
 

  export const updateCommentControllers = async (req, res) => {
    try {
      const { Content } = req.body;
      const { CommentID } = req.params;
      console.log(CommentID);
      const CommentDate =new Date();    
      const { error } = updateCommentValidator({Content });
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
  
      const updatedComment = await updateCommentService({ Content,CommentDate, CommentID });
      console.log('Updated one',updatedComment);
      if(updatedComment.rowsAffected>0){
        return sendCreated(res, 'Comment updated successfully');

      }else{
        return sendServerError(res, "Comment not found check the comment id");

      }
   
     
  
    } catch (error) {
     
      return sendServerError(res, `The error is ${error.message}`);
    }
  };
  

  export const updateContentControllers = async (req, res) => {
    try {
      const { Content } = req.body;
      const { CommentID } = req.params;

      const { error } = updateContentValidator({ Content});
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
  
      const updatedContent = await updateContentService({ Content, CommentID });
      console.log('Updated one',updatedContent);

      if(updatedContent.rowsAffected>0){
        return sendCreated(res, 'comment updated successfully');
      }else{
        return sendServerError(res, "Comment not found");
      }
 
  
    } catch (error) {
      return sendServerError(res, 'Internal server error');
    }
  };
  

  export const getSingleCommentController=async(req,res)=>{
    try {
      const {CommentID}=req.params
      const singleComment=await getSingleCommentServices(CommentID)
      if(singleComment.rowsAffected>0){
        console.log('single',singleComment); 
        res.status(200).json({ comment: singleComment });
      }else{
        res.status(400).json({ message: "No user found" });
      }
      

    } catch (error) {
      return error
    }
  }



  export const getAllCommentsController = async (req, res) => {
    try {
      const results = await getAllCommentsService()
        if(results.rowsAffected>0){
          const comments=results.recordset
    
        res.status(200).json({ Comments: comments });
        }else{
          res.status(400).json({ message :"There are no comments" });
        }      

    } catch (error) {
      console.error("Error fetching all comments:", error);
      res.status(500).json("Internal server error");
    }
  };
  

  export const deleteCommentController=async(req,res)=>{
    try {
      const {CommentID}=req.params
      const deletedComment=await deleteCommentServices(CommentID)
      if(deletedComment.rowsAffected>0){console.log('deleted comment',deletedComment); 
      sendDeleteSuccess(res,"Deleted successfully")}
      else{
        res.status(504).json("comment not avallabler");

      }
    } catch (error) {
      return error
    }
  }
