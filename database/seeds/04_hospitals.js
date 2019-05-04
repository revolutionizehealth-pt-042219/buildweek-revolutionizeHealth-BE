exports.seed = async function(knex, Promise) {
  // Deletes ALL existing entries
  // knex.raw("ALTER hospitals DISABLE TRIGGER ALL;");
  return knex("hospitals")
    .truncate()
    .then(async function() {
      // Inserts seed entries
      // knex.raw("ALTER hospitals ENABLE TRIGGER ALL;");
      return knex("hospitals").insert([
        {
          hospital_name: "Mercy Hospital",
          city: "Pine Bluff",
          state: "AR",
          zip: 71601,
          street: "2300 S Olive St"
        },
        {
          hospital_name: "Generic Hospital",
          city: "Pine Bluff",
          state: "AR",
          zip: 71601,
          street: "1601 S Cherry St"
        },
        {
          hospital_name: "Jefferson Regional Medical Center",
          city: "Pine Bluff",
          state: "AR",
          zip: 71603,
          street: "1600 W 40th Ave"
        },
        {
          hospital_name: "Memphis Zoo",
          city: "Memphis",
          state: "TN",
          zip: 38112,
          street: "2000 Prentiss Pl"
        },
        {
          hospital_name: "Meeman-Shelby Forest State Park",
          city: "Millington",
          state: "TN",
          zip: 38053,
          street: "910 Riddick Rd"
        }
      ]);
    });
};
