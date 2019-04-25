exports.up = function(knex) {
  return knex.schema.createTable("insurance_info", insurance => {
    insurance.increments();
    insurance.string("insurance_name").notNullable();
    insurance.string("insurance_type").notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("insurance_info");
};
