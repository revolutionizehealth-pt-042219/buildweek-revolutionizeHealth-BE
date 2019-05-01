const db = require("../database/dbConfig");
const { dumpError } = require("../utils/dumpError");

module.exports = {
  insert
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
    anonymous
  }) => ({
    procedure_name,
    procedure_cost,
    insurance_payment,
    insurance_adjustment,
    out_of_pocket,
    anonymous
  }))(procedureInfo);

  //TODO WRITE IF EXISTS FUNC
  //CHANGE ALL TO USE .returning("id"); //passing a string returns an array of strings back 🔥
  db.transaction(async trx => {
    //insert hosptial
    console.log(hospital);
    const [hospital_id] = await trx("hospitals")
      .insert(hospital)
      .returning("id"); //passing a string returns an array of strings back 🔥
    console.log(hospital_id);

    //add hospital id to doctor and insert doctor
    doctor.hospital_id = hospital_id;
    console.log(doctor);
    const [doctor_id] = await trx("doctors")
      .insert(doctor)
      .returning("id");
    console.log(doctor_id);

    //add doctor_id and hospital_id to procedure and insert procedure
    procedure.doctor_id = doctor_id;
    procedure.hospital_id = hospital_id;
    console.log(procedure);
    const [procedure_id] = await trx("procedures")
      .insert(procedure)
      .returning("id");
    console.log(procedure_id);

    throw new Error("Trasaction will be rolled back");
  })
    .then(() =>
      console.log("Transaction was executed and committed correctly!")
    )
    .catch(err => console.log("Transaction failed:", err.message));
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
      .from("procedures")
      .innerJoin("username", "users.id", "procedures.user_id")
      .leftJoin();
  }
}
