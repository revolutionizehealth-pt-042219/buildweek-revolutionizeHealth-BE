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

  describe("the update function", () => {
    it("should return the updated user", async () => {
      const user = await User.insert({ username: "test1", password: "test1" });
      const updatedUser = await User.update(user.id, {
        username: "test2",
        password: "test2"
      });
      expect(updatedUser).not.toBe(undefined);
    });

    it("should update a specific user", async () => {
      const user = await User.insert({ username: "test1", password: "test1" });
      const updatedUser = await User.update(user.id, {
        username: "test2",
        password: "test2"
      });
      expect(user.username).not.toBe(updatedUser.username);
      expect(user.password).not.toBe(updatedUser.password);
      expect(updatedUser.username).toBe("test2");
      expect(updatedUser.password).toBe("test2");
    });
  });
  describe("find by user function", () => {
    it("should return a user by its username", async () => {
      const user = await User.insert({ username: "test1", password: "test1" });
      const foundUser = await User.findByUsername("test1");

      expect(foundUser).toEqual(user);
    });
  });
  describe("the remove user function", () => {
    it("should remove a user by its username", async () => {
      const user = await User.insert({ username: "test1", password: "test1" });
      await User.remove("test1");
      const foundUser = await User.findByUsername("test1");

      expect(foundUser).toEqual([]);
    });
  });
});
