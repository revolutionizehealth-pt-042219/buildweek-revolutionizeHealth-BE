exports.up = function(knex) {
  return knex.schema.createTable("procedures", procedure => {
    procedure.increments();
    procedure.string("name", 255).notNullable();
    procedure.integer("hosptial_id").unsigned();
    procedure.foreign("id").references("hospitals");
    procedure.integer("doctor_id").unsigned();
    procedure.foreign("id").references("doctors");
    procedure.float("procedure_cost");
    procedure.float("insurance_payment");
    procedure.float("insurance_adjustment");
    procedure.float("out_of_pocket");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("procedures");
};
