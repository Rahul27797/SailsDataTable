/**
 * UserdetailsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  list : (req,res)=>
  {
    res.view('User/User');
  },

  add : (req,res)=>
  {
    console.log('add');
    const NewUser ={
      name :  req.body.name,
      email :  req.body.email,
      dob :  req.body.dob,
      age :  req.body.age,
      gender : req.body.gender,
      country : req.body.country
    };
    UserService.AddNewUser(NewUser, (err) => {
      if (err) {
        console.log('err',err);
      } else {
        console.log('AddData Successfully');
        res.view('User/User');
      }
    });
  },

  edit : (req,res)=>
  {
    const userId = req.params.id;
    console.log('Id', userId);
    UserService.userEditService(userId, (err,users) => {
      if (err) {
        console.log('err',err);
        // res.send(500, {err:err});
        res.status(500).send({err:err});
      } else {
        console.log('EditData Successfully');
        res.view('User/EditUser',{userdetails:users});
      }
    });
  },

  delete : (req,res)=>
  {
    const userId = req.params.id;
    console.log('Id', userId);
    UserService.userDeleteService(userId, (err) => {
      if (err) {
        console.log('err',err);
        // res.send(500, {err:err});
        res.status(500).send({err:err});
      } else {
        console.log('DeleteData Successfully');
        res.redirect('/user/list');
      }
    });
  },

  update : (req,res)=>
  {
    const userData = {
      id: req.params.id,
      name: req.body.name,
      email: req.body.email,
      dob: req.body.dob,
      age: req.body.age,
      gender : req.body.gender,
      country : req.body.country
    };
    console.log('Update controller',userData);

    UserService.userUpdateService(userData, (err) => {
      if (err) {
        res.send(500, {err:err});
      } else {
        console.log('UpdateData Successfully');
        res.redirect('/user/list');
      }
    });
  },

  viewAll: function(req, res) {
    console.log('viewall');
    console.log(req.query.iDisplayStart);
    var colS = '';
    switch(req.query.iSortCol_0){
      case '0': colS = 'id'; break;
      case '1': colS = 'name'; break;
      case '2': colS = 'age'; break;
      case '3': colS = 'email'; break;
      case '4': colS = 'dob'; break;
      case '5': colS = 'gender'; break;
      case '6': colS = 'country'; break;
      default: break;
    }

    const sort=req.query.sSortDir_0.toUpperCase();
    var p = parseInt(req.query.iDisplayStart);
    var parameters = {p:p, limit:parseInt(req.query.iDisplayLength), cols:colS ,sort:sort};
    var search = {search : req.query.sSearch};
    var number = 0;
    var newTableData ={};
    var newJson =[];
    if(req.query.sSearch ===''){

      UserService.viewAllService(parameters, (err,tableData) => {
        if (err) {
          res.send(500, {err:err});
        } else {
          console.log('view Successfully');
          newTableData ={};
          const  {aaData, iTotalRecords, iTotalDisplayRecords } = tableData;
          aaData.forEach((entry) => {
            console.log(entry);
            number++;
            const { id,name,email,dob,age,country,gender} = entry;
            newTableData={ id:id,name:name,email:email,dob:dob,age:age,country:country,gender:gender,number:number};
            newJson.push(newTableData);
            console.log("number  "+newTableData.number)
          });
          const json = {aaData:newJson, iTotalRecords:iTotalRecords,iTotalDisplayRecords:iTotalDisplayRecords};
          console.log("json  ");
          res.send(json);
        }
      });
    }
    else
    {
      console.log('in else');
      UserService.viewSearchService(search, (err,tableData) => {
        if (err) {
          res.send(500, {err:err});
        } else {
          newTableData ={};
          const  {aaData, iTotalRecords, iTotalDisplayRecords } = tableData;
          aaData.forEach((entry) => {
            console.log(entry);
            number++;
            const { id,name,email,dob,age,country,gender} = entry;
            newTableData={ id:id,name:name,email:email,dob:dob,age:age,country:country,gender:gender,number:number};
            newJson.push(newTableData);
            console.log("number  "+newTableData.number)
          });
          const json = {aaData:newJson, iTotalRecords:iTotalRecords,iTotalDisplayRecords:iTotalDisplayRecords};
          console.log("json  ");
          res.send(json);
        }
      });
     
    }
  },

};
