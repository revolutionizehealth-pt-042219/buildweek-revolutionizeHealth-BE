exports.up = function(knex) {
  return knex.schema.createTable("procedures", procedure => {
    procedure.increments();
    procedure.string("procedure_name", 255).notNullable();
    procedure
      .integer("hospital_id")
      .unsigned()
      .notNullable();
    procedure.foreign("id").references("hospitals");
    procedure
      .integer("doctor_id")
      .unsigned()
      .notNullable();
    procedure.foreign("id").references("doctors");
    procedure.float("procedure_cost").notNullable();
    procedure.float("insurance_payment").notNullable();
    procedure.float("insurance_adjustment").notNullable();
    procedure.float("out_of_pocket").notNullable();
    procedure.bool("anonymous").notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("procedures");
};
