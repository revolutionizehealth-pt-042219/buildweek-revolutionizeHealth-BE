const db = require("../database/dbConfig");
const isEquivalent = require("../utils/isObjEq");

module.exports = {
  insert,
  update,
  findAll,
  insertHospital,
  updateHospital
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

///Updates, if not exists creates new entry
async function updateHospital(changes, id, trx) {
  //get old hospital
  const hospital = await trx("hospitals")
    .where({
      id
    })
    .first();

  //check if they're the same
  if (isEquivalent(changes, hospital)) {
    return id;
  } else {
    //else make hospital entry
    const [hospitalId] = await trx("hospitals")
      .insert(changes)
      .returning("id");
    return hospitalId;
  }
}
