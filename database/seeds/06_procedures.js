exports.seed = async function(knex, Promise) {
  // Deletes ALL existing entries
  knex.raw("ALTER procedures DISABLE TRIGGER ALL;");
  return knex("procedures")
    .truncate()
    .then(async function() {
      knex.raw("ALTER procedures ENABLE TRIGGER ALL;");
      // Inserts seed entries
      return knex("procedures").insert([
        {
          id: 1,
          procedure_name: "Tonsilectomy",
          hospital_id: 1,
          doctor_id: 1,
          user_id: 1,
          procedure_cost: 2000,
          insurance_payment: 1500,
          insurance_adjustment: 300,
          out_of_pocket: 300,
          anonymous: false
        },
        {
          id: 2,
          procedure_name: "Tonsilectomy",
          hospital_id: 2,
          doctor_id: 2,
          user_id: 2,
          procedure_cost: 3000,
          insurance_payment: 2000,
          insurance_adjustment: 500,
          out_of_pocket: 500,
          anonymous: false
        },
        {
          id: 3,
          procedure_name: "Tonsilectomy",
          hospital_id: 3,
          doctor_id: 3,
          user_id: 3,
          procedure_cost: 1000,
          insurance_payment: 800,
          insurance_adjustment: 200,
          out_of_pocket: 0,
          anonymous: false
        },
        {
          id: 4,
          procedure_name: "Prosthestis Implant",
          hospital_id: 4,
          doctor_id: 4,
          user_id: 1,
          procedure_cost: 8000,
          insurance_payment: 0,
          insurance_adjustment: 0,
          out_of_pocket: 8000,
          anonymous: false
        },
        {
          id: 5,
          procedure_name: "Lobotomy",
          hospital_id: 5,
          doctor_id: 5,
          user_id: 2,
          procedure_cost: 5000,
          insurance_payment: 4000,
          insurance_adjustment: 200,
          out_of_pocket: 600,
          anonymous: false
        },
        {
          id: 6,
          procedure_name: "stiches",
          hospital_id: 1,
          doctor_id: 1,
          user_id: 3,
          procedure_cost: 200,
          insurance_payment: 100,
          insurance_adjustment: 100,
          out_of_pocket: 0,
          anonymous: false
        },
        {
          id: 7,
          procedure_name: "stiches",
          hospital_id: 2,
          doctor_id: 2,
          user_id: 1,
          procedure_cost: 100,
          insurance_payment: 50,
          insurance_adjustment: 0,
          out_of_pocket: 50,
          anonymous: false
        },
        {
          id: 8,
          procedure_name: "stiches",
          hospital_id: 3,
          doctor_id: 3,
          user_id: 3,
          procedure_cost: 200,
          insurance_payment: 80,
          insurance_adjustment: 0,
          out_of_pocket: 120,
          anonymous: false
        }
      ]);
    });
};
