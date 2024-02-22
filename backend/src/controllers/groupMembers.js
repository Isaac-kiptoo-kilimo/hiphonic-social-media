import {v4} from 'uuid'
import { notAuthorized, sendCreated, sendDeleteSuccess, sendServerError} from "../helpers/helperFunctions.js"
import { createGroupMemberService, deleteGroupMemberServices, getAllGroupMembersService, getSingleGroupMembersServices } from '../services/groupMembers.js';
import { createGroupMembersValidator } from '../validators/groupMembersValidators.js';


export const createGroupMembersController = async (req, res) => {
    try {
      
      const {GroupID,MemberID } = req.body;
      console.log(req.body);

      const { error } = createGroupMembersValidator({ GroupID,MemberID  });
      console.log("error",error);
      if (error) {
        return res.status(400).send(error.details[0].message);
      } else {
        const createdGroupMembers = { GroupID,MemberID };
  
        const result = await createGroupMemberService(createdGroupMembers);
  
        if (result.message) {
          sendServerError(res, result.message)
      } else {
          sendCreated(res, 'Groupmembers created successfully');
      }
      }
    } catch (error) {
      sendServerError(res, error.message);
    }
  };


  // export const updateGroupControllers = async (req, res) => {
  //   try {
  //     const { GroupName,Description } = req.body;
  //     const { GroupID } = req.params;

  //     const CreatedDate = new Date();    
  //     const { error } = updateGroupValidator({ GroupName,Description });
  //     if (error) {
  //       return res.status(400).json({ error: error.details[0].message });
  //     }
  
  //     const updatedGroup = await updateGroupNameService({ GroupID,GroupName,Description,CreatedDate });
  //     console.log('Updated one',updatedGroup);
  //     if (updatedGroup.error) {
  //       return sendServerError(res, updatedGroup.error);
  //     }
  
  //     return sendCreated(res, 'Group updated successfully');
  //   } catch (error) {
  //     return sendServerError(res, 'Internal server error');
  //   }
  // };
  

  export const getSingleGroupMembersController=async(req,res)=>{
    try {
      const {GroupID}=req.params
      const singleGroupMembers=await getSingleGroupMembersServices(GroupID)
      
      console.log('single',singleGroupMembers); 
      res.status(200).json({ GroupMembers: singleGroupMembers });

    } catch (error) {
      return error
    }
  }



  export const getAllGroupMembersController = async (req, res) => {
    try {
      const results = await getAllGroupMembersService()
        const groupMembers=results.recordset
      res.status(200).json({ groupMembers: groupMembers });
    } catch (error) {
      console.error("Error fetching all group Members:", error);
      res.status(500).json("Internal server error");
    }
  };
  

  export const deleteGroupMembersControllers=async(req,res)=>{
    try {
      const {GroupID}=req.params
      const deletedGroupMembers=await deleteGroupMemberServices(GroupID)
      console.log('deleted GroupMembers',deletedGroupMembers); 
      sendDeleteSuccess(res,"Deleted successfully")
    } catch (error) {
      return error
    }
  }
