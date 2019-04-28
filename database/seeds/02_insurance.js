exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("insurance_info")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("insurance_info").insert([
        { id: 1, insurance_name: "Harvard Pilgrim" },
        { id: 2, insurance_name: "Blue Cross" },
        { id: 3, insurance_name: "Red Shield" }
      ]);
    });
};
