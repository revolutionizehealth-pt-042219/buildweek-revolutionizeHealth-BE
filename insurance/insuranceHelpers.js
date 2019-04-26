const db = require("../database/dbConfig");

module.exports = {
  insert,
  update,
  findAll,
  insertIfDoesNotExist
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

// inserts the insurance into the insurance table if it doesn't exist
// otherwise it returns the idea of the existing insurance
async function insertIfDoesNotExist(insurance_name) {
  //check for existing insurance
  let insurance;
  insurance = await db("insurance_info")
    .where({
      insurance_name
    })
    .first();
  if (!insurance) {
    //else make insurance entry
    insurance = await db("insurance_info")
      .insert({
        insurance_name
      })
      .first();
  }
  const { id } = insurance;
  return id;
}
