const db = require("../database/dbConfig");
const isEquivalent = require("../utils/isObjEq");

module.exports = {
  insert,
  update,
  get,
  getById,
  remove,
  insertDoctor,
  updateDoctor
};

async function insert(doctor) {
  const [id] = await db("doctors")
    .insert(doctor)
    .returning("id");
  return db("doctors").where({ id });
}
async function update(id, changes) {
  await db("doctors")
    .where({ id })
    .update(changes);
  return db("doctors")
    .where({ id })
    .first();
}

async function get() {
  return db("doctors");
}

async function getById(id) {
  return db("doctors")
    .where({ id })
    .first();
}

async function remove(id) {
  return db("doctors")
    .where({ id })
    .del();
}

// inserts the doctor into the doctor table if it doesn't exist
// otherwise it returns the idea of the existing doctor
// requires hospital id
async function insertDoctor(doctor, trx) {
  let id;
  id = await trx
    .select("id")
    .from("doctors")
    .where({
      doctor_name: doctor.doctor_name,
      hospital_id: doctor.hospital_id
    })
    .first().id;
  console.log("doctor does exist", id);
  if (!id) {
    //else make insurance entry
    [id] = await trx("doctors")
      .insert(doctor)
      .returning("id");
    console.log("doctor doesn't exust", id);
  }
  return id;
}
async function updateDoctor(changes, id, trx) {
  //get old doctor
  const doctor = await trx("doctors")
    .where({
      id
    })
    .first();
  //compare
  if (isEquivalent(changes, doctor)) {
    return id;
  } else {
    const [doctorId] = await trx("doctors")
      .insert(changes)
      .returning("id");
    return doctorId;
  }
}
