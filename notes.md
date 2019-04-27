```
javascript
// async function insert(userInfo) {
//   //get credentials
//   let userCredintials = (({ username, password }) => ({
//     username,
//     password
//   }))(userInfo);

//   //get insurance info
//   let { has_insurance, insurance_name } = userInfo;

//   //add id and insurance id to the user info
//   let userProfile = (({
//     first_name,
//     last_name,
//     email,
//     has_insurance,
//     type
//   }) => ({
//     first_name,
//     last_name,
//     email,
//     has_insurance,
//     type
//   }))(userInfo);

//   let res;
//   return db
//     .transaction(t => {
//       // create the user
//       return db("users")
//         .transacting(t)
//         .insert(userCredintials)
//         .then(response => {
//           // ID of the newly created user
//           console.log(response[0]);
//           // add the insurance info
//           const params = { p: insurance_name };
//           return db
//             .raw(
//               `IF NOT EXISTS(SELECT :p FROM insurance_info WHERE insurance_name = :p)
//         BEGIN
//           INSERT INTO insurance_info (insurance_name)
//           VALUES (:p)
//         END
//         ELSE
//         BEGIN
//           SELECT insurance_name = :p FROM insurance_info WHERE insurance_name = :p
//         END`,
//               params
//             )
//             .transacting(t)
//             .on("query", data => {
//               console.log("query data", data);
//             })
//             .then(t.commit)
//             .catch(t.rollback);
//         });
//     })
//     .then(() => {
//       // transaction suceeded, data written
//       console.log("success");
//     })
//     .catch(e => {
//       // transaction failed, data rolled back
//       console.log("failed", e);
//     });
// }
```
