
import dotenv from 'dotenv'

import {poolRequest,sql} from '../utils/dbConnect.js'

dotenv.config();

// Register post service
export const createPostService=async(post)=>{
  
  try {
    const result=await poolRequest()
    .input('UserID', sql.VarChar,post.UserID )
    .input('PostID', sql.VarChar,post.PostID )
    .input('Content', sql.VarChar,post.Content)
    .input('PostDate', sql.DateTime,post.PostDate)
    .input('Likes', sql.Int,post.Likes)
    .input('Comments', sql.Int,post.Comments)
    .query('INSERT INTO Post (PostID,UserID,Content,Likes,Comments,PostDate) VALUES(@PostID,@UserID,@Content,@Likes,@Comments,@PostDate)')
    console.log('results',result);
    return result;

  } catch (error) {
    return error
  }
};


// updating post details based on the id

export const updatePostService=async(updatePost)=>{
  try {
    const updatedPost=await poolRequest()
    .input('PostID', sql.VarChar,updatePost.PostID)
    .input('UserID', sql.VarChar,updatePost.UserID)
    .input('Content', sql.VarChar,updatePost.Content)
    .input('PostDate', sql.DateTime,updatePost.PostDate)
    .input('Likes', sql.Int,updatePost.Likes)
    .input('Comments', sql.Int,updatePost.Comments)
  .query(`UPDATE Post  SET PostID=@PostID, Content = @Content, PostDate = @PostDate,Likes = @Likes , Comments = @Comments  WHERE  PostID = @PostID AND UserID =@UserID`)
console.log(updatePost);
  return updatedPost
  
  } catch (error) {
    return error
  }
}


// updating the content
export const updateContentService=async(updateContent)=>{
  try {
    const updatedContent=await poolRequest()
    .input('Content', sql.VarChar,updateContent.Content)
    .input('PostID', sql.VarChar,updateContent.PostID)
    .input('UserID', sql.VarChar,updateContent.UserID)
    .query(`UPDATE Post  SET Content = @Content  WHERE  PostID = @PostID AND UserID=@UserID`)
    console.log("updating content",updateContent);
  return updatedContent
  
  } catch (error) {
    return error
  }
}


export const getSinglePostServices=async(PostID)=>{
  const singlePost= await poolRequest()
  .input('PostID', sql.VarChar,PostID)
  .query('SELECT * FROM Post WHERE PostID = @PostID ')
  console.log('single post',singlePost.recordset);
  return singlePost;
}


// Fetching all available post in the database
export const getAllPostsService=async(posts)=>{
    try {
        const allPosts=await poolRequest().query(`SELECT Post.*, Comment.*
        FROM Post
        LEFT JOIN Comment ON Post.PostID = Comment.PostID`)
        return allPosts
    } catch (error) {
        return error
    }
}

export const getAllPostsAndCommentsService=async(UserID)=>{
  try {
      const allPosts=await poolRequest()
      .input('UserID', sql.VarChar,UserID)
      .query(
        `SELECT Post.*, Comment.*
      FROM Post
      LEFT JOIN Comment ON Post.PostID = Comment.PostID
      WHERE Post.UserID = @UserID`)
      return allPosts
  } catch (error) {
      return error
  }
}



// Fetching delete post
export const deletePostServices=async(PostID)=>{
  const deletedPost= await poolRequest()
  .input('PostID', sql.VarChar,PostID)
  .query('DELETE FROM Post WHERE PostID = @PostID ')
  console.log('single post',deletedPost.recordset);
  return deletedPost;
}