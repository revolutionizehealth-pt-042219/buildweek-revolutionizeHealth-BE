const userRouter = require("../users/usersRouter");
const procedureRouter = require("../procedures/procedureRouter");
const hospitalRouter = require("../hospitals/hospitalRouter");
const notFound = require("../404/404");

module.exports = server => {
  server.use("/api/users", userRouter);
  server.use("/api/procedures", procedureRouter);
  server.use("/api/hospitals", hospitalRouter);
  server.use(notFound); //should be last;
};
