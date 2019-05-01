const db = require("../database/dbConfig");
const { insertHospital } = require("../hospitals/hospitalHelpers");
const { insertDoctor } = require("../doctors/doctorsHelpers");
const { dumpError } = require("../utils/dumpError");

module.exports = {
  insert,
  getById,
  get
};

async function insert(procedureInfo) {
  //get hospital info
  let hospital = (({ hospital_name, city, street, state, zip }) => ({
    hospital_name,
    city,
    street,
    state,
    zip
  }))(procedureInfo);

  //get doctor info (still needs hospital_id)
  let doctor = (({ doctor_name, specialization }) => ({
    doctor_name,
    specialization
  }))(procedureInfo);

  //get procedure info (needs hospital_id and doctor_id)
  let procedure = (({
    procedure_name,
    procedure_cost,
    insurance_payment,
    insurance_adjustment,
    out_of_pocket,
    anonymous,
    user_id
  }) => ({
    procedure_name,
    procedure_cost,
    insurance_payment,
    insurance_adjustment,
    out_of_pocket,
    anonymous,
    user_id
  }))(procedureInfo);

  //TODO WRITE IF EXISTS FUNC
  const newProcedureId = await db
    .transaction(async trx => {
      //insert hosptial
      const hospital_id = await insertHospital(hospital, trx);

      //add hospital id to doctor and insert doctor
      doctor.hospital_id = hospital_id;
      const doctor_id = await insertDoctor(doctor, trx);

      //add doctor_id and hospital_id to procedure and insert procedure
      procedure.doctor_id = doctor_id;
      procedure.hospital_id = hospital_id;
      const [procedure_id] = await trx("procedures")
        .insert(procedure)
        .returning("id");

      // throw new Error("Trasaction will be rolled back");
      return procedure_id;
    })
    .then(result => {
      // console.log("Transaction was executed and committed correctly!");
      return result;
    })
    .catch(err => {
      dumpError(err);
      console.log("Transaction failed:", err.message);
    });
  return await getById(newProcedureId);
}

async function get(query) {
  if (query) {
  } else {
    return db
      .select(
        "procedures.id",
        "procedure_name",
        "hospital_name",
        "city",
        "state",
        "zip",
        "street",
        "doctor_name",
        "procedure_cost",
        "insurance_payment",
        "insurance_adjustment",
        "out_of_pocket",
        "anonymous",
        "username"
      )
      .where({ "procedures.id": id })
      .from("procedures")
      .leftJoin("users", "users.id", "procedures.user_id")
      .leftJoin("hospitals", "hospitals.id", "procedures.hospital_id")
      .leftJoin("doctors", "doctors.id", "procedures.doctor_id");
  }
}

async function getById(id) {
  return await db
    .select(
      "procedures.id",
      "procedure_name",
      "hospital_name",
      "city",
      "state",
      "zip",
      "street",
      "doctor_name",
      "procedure_cost",
      "insurance_payment",
      "insurance_adjustment",
      "out_of_pocket",
      "anonymous",
      "username"
    )
    .where({ "procedures.id": id })
    .from("procedures")
    .leftJoin("users", "users.id", "procedures.user_id")
    .leftJoin("hospitals", "hospitals.id", "procedures.hospital_id")
    .leftJoin("doctors", "doctors.id", "procedures.doctor_id");
}
