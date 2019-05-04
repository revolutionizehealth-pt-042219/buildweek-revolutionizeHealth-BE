exports.seed = async function(knex, Promise) {
  // Deletes ALL existing entries
  // await knex.raw("truncate table users cascade");
  return knex("users").then(async function() {
    // Inserts seed entries
    return knex("users").insert([
      {
        username: "test1",
        password: "$2a$13$ImRiWpOfZgOxV/hH6ArJ2e/k1GYo/gro50GhAD7WO55pHJB0C0m/u"
      },
      {
        username: "test2",
        password: "$2a$13$MHLAANhAEJaiTg7JONm52.BGNloUVjwGmCH/.BFNQXvYWD5V4ResC"
      },
      {
        username: "test3",
        password: "$2a$13$iV0QBeoZFeXxVRyfUsWYlOM3EquTFl2jFZt32HTeyDk4IQooFIE.C"
      }
    ]);
  });
};
