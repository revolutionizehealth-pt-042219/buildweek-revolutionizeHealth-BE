const db = require("../database/dbConfig");

module.exports = { insert, update };

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
