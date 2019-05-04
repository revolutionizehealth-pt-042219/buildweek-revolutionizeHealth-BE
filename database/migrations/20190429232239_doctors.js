exports.up = function(knex) {
  return knex.schema.createTable("doctors", doctor => {
    doctor.increments();
    doctor
      .integer("hospital_id")
      .unsigned()
      .references("hospitals");
    doctor.string("doctor_name", 255).notNullable();
    doctor.string("specialization", 255);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("doctors");
};
