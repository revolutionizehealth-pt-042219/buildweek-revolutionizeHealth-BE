const db = require("../database/dbConfig");

module.exports = { insert, update, findById, remove };

async function insert(userInfo) {
  // returns the idea of the newly inserted user
  const [id] = await db("users_info").insert(userInfo);
  return db("users_info")
    .where({ id })
    .first();
}

async function update(id, changes) {
  await db("users_info")
    .where({ id })
    .update(changes);
  return db("users_info")
    .where({ id })
    .first();
}

function findById(id) {
  return db("users_info")
    .where({ id })
    .first();
}

function remove(id) {
  return db("users_info")
    .where({ id })
    .del();
}
