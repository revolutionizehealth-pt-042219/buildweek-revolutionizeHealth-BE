exports.up = function(knex) {
  return knex.schema.createTable("procedures", procedure => {
    procedure.increments();
    procedure
      .string("name", 255)
      .notNullable()
      .notNullable();
    procedure
      .integer("hosptial_id")
      .unsigned()
      .notNullable();
    procedure
      .foreign("id")
      .references("hospitals")
      .notNullable();
    procedure
      .integer("doctor_id")
      .unsigned()
      .notNullable();
    procedure
      .foreign("id")
      .references("doctors")
      .notNullable();
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
