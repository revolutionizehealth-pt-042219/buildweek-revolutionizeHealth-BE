const userRouter = require("../users/usersRouter");
const notFound = require("../404/404");

module.exports = server => {
  server.use("/api/users", userRouter);
  server.use(notFound); //should be last;
};
