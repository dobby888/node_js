// const User = require('../models/user');

// exports.getAddUser = (req, res, next) => {
//   res.render('admin/add-user', {
//     pageTitle: 'Add User',
//     path: '/add-user',
//     editing: false
//   });
// };

// exports.postAddUser = (req, res, next) => {
//   const name = req.body.name;
//   const phoneNum = req.body.phoneNum;
//   const email = req.body.email;
//   User.create({
//     name: name,
//     phoneNum: phoneNum,
//     email: email
//   })
//     .then(result => {
//       //console.log(result);
//       console.log("user created");
//       res.redirect('/')
//     })
//     .catch(err => {
//       console.log(err);
//     })
// };

// exports.getEditUser = (req, res, next) => {
//   const editMode = req.query.edit;
//   if (!editMode) {
//     return res.redirect('/');
//   }
//   const userId = req.params.userId;
//   User.findByPk(userId)
//     .then(user => {
//       if (!user) {
//         return res.redirect('/');
//       }
//       res.render('edit-user', {
//         pageTitle: 'Edit User',
//         path: '/edit-user',
//         editing: editMode,
//         user: user
//       });
//     })
//     .catch(err => console.log(err));
// };

// exports.postEditUser = (req, res, next) => {
//   const userId = req.body.userId;
//   const updatedName = req.body.name;
//   const updatedPhoneNum = req.body.phoneNum;
//   const updatedEmail = req.body.email;
//   User.findByPk(userId)
//     .then(user => {
//       user.name = updatedName;
//       user.phoneNum = updatedPhoneNum;
//       user.email = updatedEmail;
//       user.save();
//     })
//     .then(result => {
//       console.log("updated user");
//       res.redirect('/users');
//     })
//     .catch(err => console.log(err));
// };

// exports.getUsers = (req, res, next) => {
//   User.findAll()
//     .then(users => {
//       res.render('/users', {
//         users: users,
//         pageTitle: 'Admin Users',
//         path: '/users'
//       });
//     })
//     .catch(err => console.log(err));
// };

// exports.postDeleteUser = (req, res, next) => {
//   const userId = req.body.userId;
//   User.findByPk(userId)
//     .then(user => {
//       return user.destroy();
//     })
//     .then(result => {
//       console.log("destroyed user");
//       res.redirect('/admin/users');
//     })
//     .catch(err => console.log(err));
// };



const fs = require('fs').promises;
const userDetails = require('../models/userDetails');

exports.getuserformPage = async(request,response,next)=>{
    try{
        response.sendFile('index.html',{root:'views/user'})
    }catch(err){
        console.log( err);
    }
}

exports.adduserDetails = async(request,response,next)=>{
    try{
        const{uName,emailId,phoneNo,date,time} = request.body;
        await userDetails.create({
            uName:uName,
            emailId:emailId,
            phoneNo:phoneNo,
            date:date,
            time:time           
        })
        response.redirect('/user/appointments');

    }catch(err){
        console.log(err);
    }
}

exports.getalluserDetails = async(request,response,next)=>{
    try{
        const data = await userDetails.findAll();
        response.send(data);

    }catch(err){
        console.log(err);
    }

}

exports.deleteuserDetails = async(request,response,next)=>{ 
    const dID = request.params.dID;
    try{
        await userDetails.destroy({
            where:{
                id : dID
            }
        })
        response.redirect('/user/appointments');
    }catch(err){
        console.log(err)
    }
}

exports.edituserDetails = async(request,response,next)=>{
    const eID = request.params.eID;
    try {
        const uniqueProduct = await userDetails.findByPk(eID);
        response.send(uniqueProduct);
    } catch (error) {
        console.log(error);
    }
}