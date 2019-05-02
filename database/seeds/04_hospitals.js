exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("hospitals")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("hospitals").insert([
        {
          id: 1,
          hospital_name: "Mercy Hospital",
          city: "Pine Bluff",
          state: "AR",
          zip: 71601,
          street: "2300 S Olive St"
        },
        {
          id: 2,
          hospital_name: "Generic Hospital",
          city: "Pine Bluff",
          state: "AR",
          zip: 71601,
          street: "1601 S Cherry St"
        },
        {
          id: 3,
          hospital_name: "Jefferson Regional Medical Center",
          city: "Pine Bluff",
          state: "AR",
          zip: 71603,
          street: "1600 W 40th Ave"
        },
        {
          id: 4,
          hospital_name: "Memphis Zoo",
          city: "Memphis",
          state: "TN",
          zip: 38112,
          street: "2000 Prentiss Pl"
        },
        {
          id: 5,
          hospital_name: "Meeman-Shelby Forest State Park",
          city: "Millington",
          state: "TN",
          zip: 38053,
          street: "910 Riddick Rd"
        }
      ]);
    });
};
