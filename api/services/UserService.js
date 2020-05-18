// const model = require("../models/Userdetails")
module.exports = {

  alluserdetails : (callback)=>
  {
    console.log('userdetails services');
    UserModel.alluserdetails((err,data) => {
      callback(err,data);
    });
  },

  AddNewUser : (NewUserData, callback)=>
  {
    console.log('AddUser',NewUserData);
    UserModel.AddNewUserDetails(NewUserData,(err) => {
      callback(err);
    });
  },
  userDeleteService : (userId, callback)=>
  {
    console.log('userDeleteService',userId);
    UserModel.deleteUser(userId,(err) => {
      callback(err);
    });
  },
  userEditService : (userId, callback)=>
  {
    console.log('userDeleteService',userId);
    UserModel.editUser(userId,(err,users) => {
      callback(err, users);
    });
  },
  userUpdateService : (json, callback)=>
  {
    console.log('userUpdateService',json);
    UserModel.updateUser(json,(err) => {
      callback(err);
    });
  },
  viewAllService : (json, callback)=>
  {
    console.log('view all parameter',json);
    UserModel.viewAllDataTable(json,(err,tableData) => {
      callback(err,tableData);
    });
  },
  viewSearchService: (json, callback)=>
  {
    console.log('view all parameter',json);
    UserModel.viewSearchDataTable(json,(err,tableData) => {
      callback(err,tableData);
    });
  },
};
