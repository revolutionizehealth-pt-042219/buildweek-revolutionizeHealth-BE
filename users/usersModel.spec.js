const User = require("../users/usersModel");
const db = require("../database/dbConfig");

describe("The Users Model", () => {
  beforeEach(() => {
    return db("users").truncate();
  });

  describe("the insert function", () => {
    it("should insert a user into the database", async () => {
      const user = await User.insert({ username: "test1", password: "test1" });
      expect(user.username).toBe("test1");
      expect(user.password).toBe("test1");
    });
  });
});
