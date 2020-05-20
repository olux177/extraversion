var db = require('../db')

async function isGroupExist(name) {
  const result = await db.promise().query(
    'SELECT * from groups WHERE name=?', [name],
  );
  return result;
}

async function findGroup(groupid) {  
  const sql = "SELECT * FROM groups WHERE id=?";
  const result = await db.promise().query(sql,[groupid]);
  return result;
}


async function allGroups() {  
  const sql = 'SELECT * from groups'
  const result = await db.promise().query(sql);
  return result;
}

async function addGroup(form) {  
  const addObj = {
    name:form.name,
    description:form.description,
  };
  const sql = 'INSERT INTO groups SET ?';
  const result = await db.promise().query(sql, addObj);
  return result;
}

async function updateGroup(form) {  
  const updateObj = [
    form.name,
    form.description,
    form.groupid,
  ];
  
  const sql = "UPDATE groups SET name=?, description=? WHERE id=1";
  const result = await db.promise().query(sql, updateObj);
  return result;
}

async function deleteGroup(form) {  
  const updateObj = [
    form.id,
  ];
  const sql = "DELETE FROM groups WHERE id=?";
  const result = await db.promise().query(sql, updateObj);
  return result;
}

module.exports = {isGroupExist,findGroup,allGroups,addGroup,updateGroup,deleteGroup};
