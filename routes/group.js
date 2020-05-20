var express = require('express');
var router = express.Router();
const {isGroupExist,findGroup,allGroups,addGroup,updateGroup,deleteGroup} = require('../models/group')

/* GET users listing. */
router.get('/', function(req, res, next) {
  allGroups().then(([rows],err)=>{
    if (err) throw err; 
    res.send({data:rows, total:rows.length});
  })
});

/* FIND user. */
router.get('/find', function(req, res, next) {
  findGroup(req.query.id).then(([rows])=>{
    res.send({data:rows, total:rows.length});
  }).catch((err)=>{
    throw err
  })
});

/* ADD new user. */
router.post('/add', function(req, res, next) {
  isGroupExist(req.body.name).then(([rows,fields])=>{    
    if (rows.length===0) {      
      addGroup(req.body).then((err,data)=>{
        res.send({msg:`Group is inserted successfully`});
      }).catch((err)=>{
        throw err
      })
    }
    else {
      res.send({msg:`Group exist already`});      
    }
  })
});

/* POST user. */
router.patch('/update', function(req, res, next) {
  updateGroup(req.body).then((err,data)=>{
    res.send({msg:`Group is updated successfully`});
  }).catch((err)=>{
    throw err
  })
});

/* DELETE user. */
router.delete('/delete', function(req, res, next) {
  deleteGroup(req.body).then((data)=>{
    res.send({msg:`Group is deleted successfully`});
  }).catch((err)=>{
    throw err
  })
});

module.exports = router;
