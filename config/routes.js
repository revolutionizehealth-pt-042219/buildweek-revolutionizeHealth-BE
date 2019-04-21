const userRouter = require("../users/usersRouter");

module.exports = server => {
  server.use("/api/users", userRouter);
};
