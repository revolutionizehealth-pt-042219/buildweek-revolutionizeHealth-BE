exports.up = function(knex) {
  return knex.schema.createTable("doctors", doctor => {
    doctor.increments();
    doctor.integer("hospital_id").unsigned();
    doctor.foreign("id").references("hospitals");
    doctor.string("name", 255).notNullable();
    doctor.string("specialization", 255).notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("doctors");
};
