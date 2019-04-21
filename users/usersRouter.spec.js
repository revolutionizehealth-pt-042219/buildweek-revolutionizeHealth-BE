const req = require("supertest");
const server = require("../server");
const db = require("../database/dbConfig");

beforeEach(() => {
  return db("users").truncate();
});

describe("The Users Router", () => {
  const route = "/api/users";
  describe("POST /register", () => {
    xit("should send back a JWT on successful registration", async () => {});
    xit("should return 201 on a successful registration", async () => {});
    xit("should successfully hash a users password ", async () => {});
    it("should return 400 if password is not provided", async () => {
      const user = { username: "test1" };
      const res = await req(server)
        .post(route + "/register")
        .send(user);
      expect(res.status).toBe(400);
    });
    it("should return 400 if username is not provided", async () => {
      const user = { password: "test1" };
      const res = await req(server)
        .post(route + "/register")
        .send(user);
      expect(res.status).toBe(400);
    });
  });
});
