const db = require("../database/dbConfig");

module.exports = {
  insert,
  update,
  findAll,
  insertHospital
};

async function insert(hospital) {
  const [id] = await db("hospitals")
    .insert(hospital)
    .returning("id");
  return db("hospitals").where({ id });
}
async function update(id, changes) {
  await db("hospitals")
    .where({ id })
    .update(changes);
  return db("hospitals")
    .where({ id })
    .first();
}

async function findAll() {
  return db("hospitals");
}

// inserts the hospital into the hospital table if it doesn't exist
// otherwise it returns the idea of the existing hospital
// requires hospital id
async function insertHospital(hospital, trx) {
  //check for existing hospital
  let id;
  id = await trx
    .select("id")
    .from("hospitals")
    .where({
      hospital_name: hospital.hospital_name
    })
    .first().id;
  console.log(" hospital does exist", id);
  if (!id) {
    //else make insurance entry
    [id] = await trx("hospitals")
      .insert(hospital)
      .returning("id");
    console.log(" hospital doesn't exust", id);
  }
  return id;
}