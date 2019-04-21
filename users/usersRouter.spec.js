const req = require("supertest");
const server = require("./server.js");
const db = require("../database/dbConfig");

beforeEach(() => {
  return db("users").truncate();
});

describe("The Users Router", () => {
  describe("POST /register", () => {
    todo("should send back a JWT on successful registration", async () => {});
    todo("should return 201 on a successful registration", async () => {});
    todo("should successfully hash a users password ", async () => {});
    todo(
      "should return 400 if username and password are not provided",
      async () => {}
    );
  });
});
