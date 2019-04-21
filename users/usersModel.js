const db = require("../database/dbConfig");

module.exports = { insert };

async function insert(user) {
  // returns the idea of the newly inserted user
  const [id] = await db("users").insert(user);
  return db("users")
    .where({ id })
    .first();
}
