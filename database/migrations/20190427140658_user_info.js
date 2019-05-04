exports.up = function(knex) {
  return knex.schema.createTable("users_info", users_info => {
    users_info.increments();
    users_info
      .integer("user_id")
      .unsigned()
      .references("users");
    users_info.string("first_name", 255).notNullable();
    users_info.string("last_name", 255).notNullable();
    users_info.string("email", 255).notNullable();
    users_info.bool("has_insurance").notNullable();
    users_info
      .integer("insurance_id")
      .unsigned()
      .references("insurance_info");
    users_info.enum("type", ["patient", "doctor"]);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("users_info");
};
