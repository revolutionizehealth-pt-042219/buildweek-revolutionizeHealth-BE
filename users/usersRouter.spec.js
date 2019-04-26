const req = require("supertest");
const server = require("../server");
const db = require("../database/dbConfig");
const bcrypt = require("bcryptjs");

beforeEach(() => {
  return db("users").truncate();
});

describe("The Users Router", () => {
  const route = "/api/users";
  describe("POST /register", () => {
    it.only("should send back a JWT on successful registration", async () => {
      const user = { username: "test1", password: "test1" };
      const res = await req(server)
        .post(route + "/register")
        .send(user);
      expect(res.status).toBe(201);
      expect(res.body.token).not.toBe(undefined);
    });
    it("should return 201 on a successful registration", async () => {
      const user = { username: "test1", password: "test1" };
      const res = await req(server)
        .post(route + "/register")
        .send(user);
      expect(res.status).toBe(201);
    });
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
  describe("POST /login", () => {
    it("should return 400 if password is not provided", async () => {
      const user = { username: "test1" };
      const res = await req(server)
        .post(route + "/login")
        .send(user);
      expect(res.status).toBe(400);
    });
    it("should return 400 if username is not provided", async () => {
      const user = { password: "test1" };
      const res = await req(server)
        .post(route + "/login")
        .send(user);
      expect(res.status).toBe(400);
    });
    it("should send back a JWT on successful login", async () => {
      let user = { username: "test1", password: "test1" };
      const hash = bcrypt.hashSync(user.password, 13);
      user.password = hash;
      await db("users").insert(user);

      const credentials = { username: "test1", password: "test1" };
      const res = await req(server)
        .post(route + "/login")
        .send(credentials);
      expect(res.status).toBe(200);
      expect(res.body.token).not.toBe(undefined);
    });
    it("should return 200 on a successful login", async () => {
      let user = { username: "test1", password: "test1" };
      const hash = bcrypt.hashSync(user.password, 13);
      user.password = hash;
      await db("users").insert(user);

      const credentials = { username: "test1", password: "test1" };
      const res = await req(server)
        .post(route + "/login")
        .send(credentials);
      expect(res.status).toBe(200);
    });
  });
});
