const db = require("../database/dbConfig");
const { insertIfDoesNotExist } = require("../insurance/insuranceHelpers");

module.exports = {
  insert,
  update,
  findCredentialsByUsername,
  remove,
  getUserInfoByUsername,
  getUserInfoById
};

async function insert(userInfo) {
  //get credentials
  let userCredintials = (({ username, password }) => ({
    username,
    password
  }))(userInfo);

  //pass credientials into db
  const [user] = await db("users").insert(userCredintials, ["id"]);
  console.log("user", user);

  //add id and insurance id to the user info
  let userProfile = (({
    first_name,
    last_name,
    email,
    has_insurance,
    type
  }) => ({
    user_id: user.id,
    first_name,
    last_name,
    email,
    has_insurance,
    type
  }))(userInfo);

  //get insurance info
  let { has_insurance, insurance_name } = userInfo;
  let insurance_id;

  if (has_insurance && insurance_name) {
    insurance_id = await insertIfDoesNotExist(insurance_name);
    userProfile.insurance_id = insurance_id;
  }

  //insert userInfo into users_info
  console.log("userprofile", userProfile);
  console.log("insurance_id", insurance_id);
  const [user_info_id] = await db("users_info").insert(userProfile, ["id"]);

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
    .where({ "users.id": user.id })
    .innerJoin("users_info", "users_info.user_id", "users.id")
    .leftJoin("insurance_info", "insurance_info.id", "users_info.insurance_id")
    .first();
}

async function update(id, changes) {
  //check for insurance
  const { has_insurance, insurance_name } = changes;
  let insurance_id;
  //if it exists set the new id
  if (has_insurance && insurance_name) {
    insurance_id = await insertIfDoesNotExist(insurance_name);
  }

  //get users_info subset of changes
  let userChanges = (({
    first_name,
    last_name,
    email,
    has_insurance,
    type
  }) => ({
    first_name,
    last_name,
    email,
    has_insurance,
    insurance_id,
    type
  }))(changes);

  await db("users_info")
    .where({ id })
    .update(userChanges);
  return getUserInfoById(id);
}

function findCredentialsByUsername(username) {
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
    .leftJoin("insurance_info", "insurance_info.id", "users_info.insurance_id") //need this for if insurance is null
    .first();
}

function getUserInfoById(id) {
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
    .where({ "users.id": id })
    .innerJoin("users_info", "users_info.user_id", "users.id")
    .leftJoin("insurance_info", "insurance_info.id", "users_info.insurance_id")
    .first();
}

function remove(id) {
  // const num = await db('user_info').where({id}).del();
  // return db("users")
  //   .where({ id })
  //   .del();
  return db
    .transaction(t => {
      return db("users")
        .transacting(t)
        .where({ id })
        .del()
        .then(res => {
          return db("user_info")
            .transacting(t)
            .where({ id })
            .del();
        })
        .then(t.commit)
        .catch(t.rollback);
    })
    .then(() => {
      // transaction suceeded, data written
      console.log("success");
    })
    .catch(() => {
      // transaction failed, data rolled back
      console.log("failed");
    });
}
