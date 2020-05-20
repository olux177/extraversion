var db = require('../db')

async function isUserExist(email) {
  const result = await db.promise().query(
    'SELECT * from users WHERE email = (?)',   [email],
  );
  return result;
}

async function queryUser(fname='',lname='',email='') {  
  const sql = "SELECT * FROM users WHERE firstname=? OR lastname=? OR email=?";
  const result = await db.promise().query(sql,[fname,lname,email]);
  return result;
}

async function findUser(userid) {  
  const sql = "SELECT users.id, users.firstname, users.lastname, users.email, groups.name, groups.description FROM users LEFT JOIN user_groups ug ON ug.user_id = users.id LEFT JOIN groups ON groups.id = ug.group_id  WHERE users.id = ?";
  // const sql = "SELECT * FROM users WHERE id=?";
  const result = await db.promise().query(sql,[userid]);
  return result;
}

async function allUser(form) {  
  const sql = 'SELECT * from users'
  const result = await db.promise().query(sql);
  return result;
}

async function addUser(form) {  
  const addUserObj = {
    firstname:form.firstname,
    lastname:form.lastname,
    email:form.email
  };
  const sql = 'INSERT INTO users SET ?';
  const result = await db.promise().query(sql, addUserObj);
  return result;
}

async function addGroup(userid,groupid) {
  const addGroupObj = {
    user_id:userid,
    group_id:groupid
  };
  const sql = 'INSERT INTO user_groups SET ?';
  const result = await db.promise().query(sql,addGroupObj);
  return result;
}

async function userGroup(userid,groupid) {
  const addGroupObj = {
    user_id:userid,
    group_id:groupid
  };
  const sql = 'INSERT INTO user_groups SET ?';
  const result = await db.promise().query(sql,addGroupObj);
  return result;
}

async function updateUser(form) {  
  const updateObj = [
    form.firstname,
    form.lastname,
    form.email,
    form.userid,
  ];
  
  const sql = "UPDATE users SET firstname=?, lastname=?, email=? WHERE id=?";
  const result = await db.promise().query(sql, updateObj);
  return result;
}

async function deleteUser(form) {  
  const updateObj = [
    form.userid,
  ];
  const sql = "DELETE FROM users WHERE id=?";
  const result = await db.promise().query(sql, updateObj);
  return result;
}

module.exports = {isUserExist,queryUser,findUser,allUser,addUser,addGroup,userGroup,updateUser,deleteUser};
