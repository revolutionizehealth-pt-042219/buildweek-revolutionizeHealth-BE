const db = require("../database/dbConfig");

module.exports = { insert, update, findByUsername, remove };

async function insert(user) {
  // returns the idea of the newly inserted user
  const [id] = await db("users").insert(user);
  return db("users")
    .where({ id })
    .first();
}

async function update(id, changes) {
  await db("users")
    .where({ id })
    .update(changes);
  return db("users")
    .where({ id })
    .first();
}

function findByUsername(username) {
  return db("users")
    .where({ username })
    .first();
}

function remove(username) {
  return db("users")
    .where({ username: username })
    .del();
}
