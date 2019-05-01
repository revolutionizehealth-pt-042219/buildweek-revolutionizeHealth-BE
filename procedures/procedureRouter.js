const express = require("express");
const router = express.Router();
const Procedures = require("../procedures/procedureHelper");
const { dumpError } = require("../utils/dumpError");
const { authenticate, authorize } = require("../auth/authMiddleware");

router.get("/", async (req, res) => {
  const query = req.params;
  console.log(query);
  const procedures = await Procedures.get(query);

  try {
    res.status(200).json(procedures);
  } catch (e) {
    dumpError(e);
    res.status(500).json({ error: "could not get procedures" });
  }
});

router.post("/", async (req, res) => {
  const procedureInfo = req.body;
  try {
    const newProcedure = await Procedures.insert(procedureInfo);
    console.log("newProcedure", newProcedure);
    res.status(201).json(newProcedure);
  } catch (e) {
    dumpError(e);
    res.status(500).json({ error: "could not create procedure" });
  }
});

module.exports = router;
