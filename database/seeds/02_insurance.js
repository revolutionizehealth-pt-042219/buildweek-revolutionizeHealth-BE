exports.seed = async function(knex, Promise) {
  // Deletes ALL existing entries
  // knex.raw("ALTER insurance_info DISABLE TRIGGER ALL;");
  return knex("insurance_info")
    .truncate()
    .then(async function() {
      // Inserts seed entries
      // knex.raw("ALTER insurance_info ENABLE TRIGGER ALL;");
      return knex("insurance_info").insert([
        { id: 1, insurance_name: "Harvard Pilgrim" },
        { id: 2, insurance_name: "Blue Cross" },
        { id: 3, insurance_name: "Red Shield" }
      ]);
    });
};
