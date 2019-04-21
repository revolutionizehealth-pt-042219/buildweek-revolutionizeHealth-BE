const req = require("supertest");
const server = require("../server");
const db = require("../database/dbConfig");

beforeEach(() => {
  return db("users").truncate();
});

describe("The Users Router", () => {
  const route = "/api/users";
  describe("POST /register", () => {
    it("should send back a JWT on successful registration", async () => {
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
  });
});
