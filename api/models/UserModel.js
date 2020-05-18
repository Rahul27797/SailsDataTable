/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    name : {
      type : 'string',
    },

    email : {
      type : 'string',
    },

    dob : {
      type :'string',
      columnType : 'date'
    },

    age : {
      type : 'number'
    },

    country : {
      type : 'string',
    },
    gender : {
      type : 'string'
    }
  },
  alluserdetails(callback){
    console.log('all user details model');
    UserModel.find().exec((err,userdetails)=>
    {

      callback(err,userdetails);

    });
  },
  AddNewUserDetails(data,callback){
    console.log('Add Model');
    const { name, email, dob, age, gender, country} = data;
    UserModel.create({name:name,email:email,dob:dob,age:age,gender:gender,country:country }).exec((err) => {

      callback(err);

    });
  },
  deleteUser(userId,callback){
    console.log('Delete User Model');
    UserModel.destroy({ id: userId }).exec((err) => {

      callback(err);

    });
  },
  editUser(userId,callback){
    console.log('edit User Model');
    UserModel.findOne({ id: userId }).exec((err,users) => {

      callback(err,users);

    });
  },
  updateUser(addData, callback){
    console.log('updateData');
    const { id,name, email, dob, age, gender, country} = addData;
    console.log('Update User Model');
    UserModel.update({ id },{name, email, dob, age, gender, country}).exec((err) => {

      callback(err);

    });
  },
  viewAllDataTable(json,callback){
    console.log('viewAllDataTable Model');
    const  {p, limit, cols ,sort}= json;
    UserModel.find().skip(p).limit(limit).sort(`${cols} ${sort}`).exec((err, usr) => {
      if(err){
        // eslint-disable-next-line callback-return
        callback(err,usr);
      } else {
        UserModel.count().exec((err1, result) => {
          console.log(result);
          var json = {
            aaData: usr,
            iTotalRecords: result,
            iTotalDisplayRecords: result
          };
          console.log(json);
          callback(err,json);
        });
      }
    });
  },
  viewSearchDataTable(json,callback){
    console.log('view Search DataTable Model');
    const  {search }= json;
    UserModel.find({or :[{ _id: { contains: search }},
      { name: { contains: search }},
      { email: { contains: search }},
      { gender: { contains: search }},
      { country: { contains: search }}]}).exec((err, usr) => {
      if(err){
        // eslint-disable-next-line callback-return
        callback(err,json);
      } else {
        UserModel.count().exec((result) => {
          var json = {
            aaData: usr,
            iTotalRecords: result,
            iTotalDisplayRecords: result
          };
         
          callback(err,json);
        });
      }
    });
  },
  datastores :'default',

};
