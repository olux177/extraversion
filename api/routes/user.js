var express = require('express');
var router = express.Router();
const {isUserExist,queryUser,findUser,findUser1,allUser,addUser,addGroup,userGroup,updateUser,deleteUser} = require('../models/user')
const {findGroup} = require('../models/group')

/* GET users listing. */
router.get('/', function(req, res, next) {
  allUser().then(([rows],err)=>{
    if (err) throw err; 
    res.send({data:rows, total:rows.length});
  })
});

/* FIND user. */
router.get('/query', function(req, res, next) {
  queryUser(req.body.firstname,req.body.lastname,req.body.email).then(([rows])=>{
    res.send({data:rows, total:rows.length});
  }).catch((err)=>{
    throw err
  })
});

/* FIND user. */
router.get('/find', function(req, res, next) {
  findUser(req.query.id).then(([rows])=>{
    // console.log(buildTree (rows,'name'));
    const groups=[];
    const user = {}
    rows.forEach((item)=>{
      const group = {}
      user.firstname=item.firstname
      user.lastname=item.lastname
      user.email=item.email
      group.id=item.groupid
      group.name=item.name
      group.description=item.description
      user.groups=[]
      if(item.name){
        groups.push(group )
        user.groups=groups
      }      
      return user;
    })    
    res.send({data:user, total:rows.length});
  }).catch((err)=>{
    throw err
  })
});

const buildTree = (data, parent=null) => {
  let result = []
  data.forEach((node) => {
    
    if(node.name === node[parent]){
      // const children = buildTree(data, node.name);
      console.log(children);
      
      // if(children.length>0){         
      //   node['groups'] = children;
      // }
      result.push(node)
    }
  })
  return result
}

/* ADD new user. */
router.post('/add', function(req, res, next) {
  isUserExist(req.body.email).then(([rows,fields])=>{    
    if (rows.length===0) {      
      addUser(req.body).then((err,data)=>{
        res.send({msg:`User is inserted successfully`});
      }).catch((err)=>{
        throw err
      })
    }
    else {
      res.send({msg:`User exist already`});      
    }
  })
});

/* ADD user to group. */
router.post('/addgroup', function(req, res, next) {
  const userid = req.body.userid;
  const groupid = req.body.groupid;
  findUser1(userid,groupid).then(([rows])=>{
    if (rows.length>0) {
      res.send({msg:`User is already added to group`});
    }
    else {     
      addGroup(userid,groupid).then(()=>{
        res.send({msg:`User is added to group`});
      })
    }    
  })
});
/* FIND user. */
// router.get('/usergroup', function(req, res, next) {
//   userGroup(req.query.id).then(([rows])=>{
//     res.send({data:rows, total:rows.length});
//   }).catch((err)=>{
//     throw err
//   })
// });

/* POST user. */
router.patch('/update', function(req, res, next) {
  updateUser(req.body).then((err,data)=>{
    res.send({msg:`User is updated successfully`});
  }).catch((err)=>{
    throw err
  })
});

/* DELETE user. */
router.delete('/delete', function(req, res, next) {
  deleteUser(req.body).then((data)=>{
    res.send({msg:`User is deleted successfully`});
  }).catch((err)=>{
    throw err
  })
});

module.exports = router;
