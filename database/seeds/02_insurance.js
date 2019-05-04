exports.seed = async function(knex, Promise) {
  // Deletes ALL existing entries
  // knex.raw("ALTER insurance_info DISABLE TRIGGER ALL;");
  return knex("insurance_info")
    .truncate()
    .then(async function() {
      // Inserts seed entries
      // knex.raw("ALTER insurance_info ENABLE TRIGGER ALL;");
      return knex("insurance_info").insert([
        { insurance_name: "Harvard Pilgrim" },
        { insurance_name: "Blue Cross" },
        { insurance_name: "Red Shield" }
      ]);
    });
};
