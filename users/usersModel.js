const db = require("../database/dbConfig");

module.exports = {
  insert,
  update,
  findByUsername,
  remove,
  getUserInfoByUsername
};

async function insert(userInfo) {
  //get credentials
  let userCredintials = (({ username, password }) => ({
    username,
    password
  }))(userInfo);

  //get insurance info
  let { has_insurance, insurance_name } = userInfo;
  let insurance_id;

  if (has_insurance && insurance_name) {
    //check for existing insurance
    [insurance_id] = await db("insurance_info").where({
      insurance_name
    });
    if (!insurance_id) {
      //else make insurance entry
      [insurance_id] = await db("insurance_info").insert({
        insurance_name
      });
    }
  }

  //pass credientials into db
  const [user_id] = await db("users").insert(userCredintials);

  //add id and insurance id to the user info
  let userProfile = (({
    first_name,
    last_name,
    email,
    has_insurance,
    type
  }) => ({
    user_id: user_id,
    first_name,
    last_name,
    email,
    has_insurance,
    insurance_id,
    type
  }))(userInfo);

  //insert userInfo into users_info
  const [user_info_id] = await db("users_info").insert(userProfile);

  return db
    .select(
      "users.id",
      "username",
      "first_name",
      "last_name",
      "email",
      "has_insurance",
      "insurance_name",
      "type"
    )
    .from("users")
    .where({ "users.id": user_id })
    .innerJoin("users_info", "users_info.user_id", "users.id")
    .innerJoin("insurance_info", "insurance_info.id", "users_info.insurance_id")
    .first();
}

async function update(id, changes) {
  await db("users")
    .where({ id })
    .update(changes);
  return db("users")
    .where({ id })
    .first();
}

function findByUsername(username) {
  return db("users")
    .where({ username })
    .first();
}

function getUserInfoByUsername(username) {
  return db
    .select(
      "users.id",
      "username",
      "first_name",
      "last_name",
      "email",
      "has_insurance",
      "insurance_name",
      "type"
    )
    .from("users")
    .where({ username })
    .innerJoin("users_info", "users_info.user_id", "users.id")
    .innerJoin("insurance_info", "insurance_info.id", "users_info.insurance_id")
    .first();
}

function remove(username) {
  return db("users")
    .where({ username: username })
    .del();
}
