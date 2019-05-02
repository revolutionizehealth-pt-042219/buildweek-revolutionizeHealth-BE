exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("doctors")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("doctors").insert([
        {
          id: 1,
          hospital_id: 1,
          doctor_name: "Dr. Smithington",
          specialization: "mechanic"
        },
        {
          id: 2,
          hospital_id: 2,
          doctor_name: "Dr. Red",
          specialization: "mechanic"
        },
        {
          id: 3,
          hospital_id: 3,
          doctor_name: "Dr. Mario",
          specialization: "Virology"
        },
        {
          id: 4,
          hospital_id: 4,
          doctor_name: "Dr. Octopus",
          specialization: "Mad Science"
        },
        {
          id: 5,
          hospital_id: 5,
          doctor_name: "Dr. Robotnik",
          specialization: "Lobotomies"
        }
      ]);
    });
};
