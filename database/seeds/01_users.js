exports.seed = async function(knex, Promise) {
  // Deletes ALL existing entries
  await knex.raw("ALTER users DISABLE TRIGGER ALL;");
  return knex("users")
    .truncate()
    .then(async function() {
      // Inserts seed entries
      await knex.raw("ALTER users ENABLE TRIGGER ALL;");
      return knex("users").insert([
        {
          id: 1,
          username: "test1",
          password:
            "$2a$13$ImRiWpOfZgOxV/hH6ArJ2e/k1GYo/gro50GhAD7WO55pHJB0C0m/u"
        },
        {
          id: 2,
          username: "test2",
          password:
            "$2a$13$MHLAANhAEJaiTg7JONm52.BGNloUVjwGmCH/.BFNQXvYWD5V4ResC"
        },
        {
          id: 3,
          username: "test3",
          password:
            "$2a$13$iV0QBeoZFeXxVRyfUsWYlOM3EquTFl2jFZt32HTeyDk4IQooFIE.C"
        }
      ]);
    });
};
