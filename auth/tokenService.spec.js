const { genToken } = require("./tokenService");
const jwt = require("jsonwebtoken");
const jwtKey =
  process.env.JWT_SECRET ||
  "add a .env file to root of project with the JWT_SECRET variable";

describe(" the token service", () => {
  it("should generate and return token based on the user", async () => {
    const user = { id: 1, username: "test1" };
    const token = genToken(user);
    const payload = jwt.verify(token, jwtKey);
    console.log(payload);
    expect(token).not.toBe(undefined);
    expect(payload.id).toBe(1);
    expect(payload.username).toBe("test1");
  });
});
