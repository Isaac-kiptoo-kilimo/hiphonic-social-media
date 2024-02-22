
import dotenv from 'dotenv'

import {poolRequest,sql} from '../utils/dbConnect.js'

dotenv.config();

// Register post service
export const createGroupMemberService=async(groupmembers)=>{
  
  try {
    const result=await poolRequest()
    .input('GroupID', sql.VarChar,groupmembers.GroupID )
    .input('MemberID', sql.VarChar,groupmembers.MemberID)
    .query('INSERT INTO GroupMembers (GroupID,MemberID) VALUES(@GroupID,@MemberID)')
    console.log('results',result);
    return result;

  } catch (error) {
    return error
  }
};

// GroupMembers (GroupID, MemberID)
// updating post details based on the id

// export const updateGroupService=async(updateGroup)=>{
//   try {
//     const updatedGroup=await poolRequest()
//     .input('GroupID', sql.VarChar,updateGroup.GroupID )
//     .input('GroupName', sql.VarChar,updateGroup.GroupName)
//     .input('Description', sql.VarChar,updateGroup.Description)
//     .input('CreatedDate', sql.DateTime,updateGroup.CreatedDate)
//     .query(`UPDATE tbl_group SET GroupID=@GroupID, GroupName = @GroupName,Description=@Description, CreatedDate = @CreatedDate  WHERE  GroupID=@GroupID`)
//     console.log(updatedGroup);
//     return updatedGroup
  
//   } catch (error) {
//     return error
//   }
// }


export const getSingleGroupMembersServices=async(GroupID)=>{
  const singleGroupMembers= await poolRequest()
  .input('GroupID', sql.VarChar,GroupID)
  .query('SELECT * FROM GroupMembers  WHERE GroupID = @GroupID')
  console.log('single groupmembers',singleGroupMembers.recordset);
  console.log(singleGroupMembers);
  return singleGroupMembers.recordset;
}

// SELECT * FROM GroupMembers  WHERE GroupID = 1


// Fetching all available post in the database
export const getAllGroupMembersService=async()=>{
    try {
        const allGroupMembers=await poolRequest().query(`SELECT * FROM GroupMembers`)
        return allGroupMembers
    } catch (error) {
        return error
    }
}

// Fetching delete post
export const deleteGroupMemberServices=async(groupmembers)=>{
  const deletedGroupMember= await poolRequest()
  .input('GroupID', sql.VarChar,groupmembers.GroupID)
  .input('MemberID', sql.VarChar,groupmembers.MemberID)
  .query('DELETE FROM GroupMembers WHERE GroupID = @GroupID AND MemberID = @MemberID')
  console.log('single groupmember',deletedGroupMember.recordset);
  return deletedGroupMember.recordset;
}