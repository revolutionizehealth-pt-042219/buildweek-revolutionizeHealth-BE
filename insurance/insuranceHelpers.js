const db = require("../database/dbConfig");

module.exports = {
  insert,
  update,
  findAll
};

async function insert(insurance_name) {
  const [id] = await db("insurance_info").insert(insurance_name);
  return db("insurance_info")
    .where({ id })
    .first();
}
async function update(insurance_name, changes) {
  await db("insurance_info")
    .where({ insurance_name })
    .update(changes);
  return db("insurance_info")
    .where({ insurance_name })
    .first();
}

async function findAll() {
  return db("insurance_info");
}
