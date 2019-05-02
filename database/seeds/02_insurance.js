exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  knex.raw("SET foreign_key_checks = 0");
  return knex("insurance_info")
    .truncate()
    .then(function() {
      // Inserts seed entries
      knex.raw("SET foreign_key_checks = 1");
      return knex("insurance_info").insert([
        { id: 1, insurance_name: "Harvard Pilgrim" },
        { id: 2, insurance_name: "Blue Cross" },
        { id: 3, insurance_name: "Red Shield" }
      ]);
    });
};
