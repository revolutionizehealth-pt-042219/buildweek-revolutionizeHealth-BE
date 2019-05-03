exports.seed = async function(knex, Promise) {
  // Deletes ALL existing entries
  knex.raw("ALTER users_info DISABLE TRIGGER ALL;");
  return knex("users_info")
    .truncate()
    .then(async function() {
      // Inserts seed entries
      knex.raw("ALTER users_info ENABLE TRIGGER ALL;");
      return knex("users_info").insert([
        {
          id: 1,
          user_id: 1,
          first_name: "Todd",
          last_name: "Howard",
          email: "ToddHoward@bethesda.net",
          has_insurance: true,
          insurance_id: 1,
          type: "patient"
        },
        {
          id: 2,
          user_id: 2,
          first_name: "Hank",
          last_name: "Hill",
          email: "yup@kingofthe.net",
          has_insurance: true,
          insurance_id: 2,
          type: "patient"
        },
        {
          id: 3,
          user_id: 3,
          first_name: "Digones",
          last_name: "I dunno",
          email: "SomeClayPot@thepark.net",
          has_insurance: false,
          type: "patient"
        }
      ]);
    });
};
