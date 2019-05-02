const express = require("express");
const router = express.Router();
const Procedures = require("../procedures/procedureHelper");
const { dumpError } = require("../utils/dumpError");
const { authenticate, authorize } = require("../auth/authMiddleware");

router.get("/", async (req, res) => {
  const query = req.params;
  try {
    const procedures = await Procedures.get(query);
    res.status(200).json(procedures);
  } catch (e) {
    dumpError(e);
    res.status(500).json({ error: "could not get procedures" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const procedures = await Procedures.getById(id);
    res.status(200).json(procedures);
  } catch (e) {
    dumpError(e);
    res.status(500).json({ error: "could not get procedures" });
  }
});

router.post("/", authenticate, async (req, res) => {
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

router.put("/:procedureId/:id", authenticate, async (req, res) => {
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
