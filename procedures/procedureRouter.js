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
    res.status(201).json(newProcedure);
  } catch (e) {
    dumpError(e);
    res.status(500).json({ error: "could not create procedure" });
  }
});

router.put("/:procedureId", authenticate, async (req, res) => {
  const changes = req.body;
  const { procedureId } = req.params;
  try {
    const [procedure] = await Procedures.getById(procedureId);
    const { hospital_id, doctor_id } = procedure;
    //if the user who made the procedure is not the one trying to edit
    if (procedure.id !== req.decoded.id) {
      res.status(401).json({ error: "Not Authorized To Edit Procedure" });
    } else {
      const newProcedure = await Procedures.update(
        procedureId,
        changes,
        hospital_id,
        doctor_id
      );
      res.status(201).json(newProcedure);
    }
  } catch (e) {
    dumpError(e);
    res.status(500).json({ error: "could not create procedure" });
  }
});

router.delete("/:procedureId", authenticate, async (req, res) => {
  const { procedureId } = req.params;
  try {
    const count = await Procedures.remove(procedureId);
    if (count) {
      res.status(201).json({ message: "successfully deleted procedure" });
    } else {
      res.status(404).json({ error: "procedure does not exist" });
    }
  } catch (e) {
    dumpError(e);
    res.status(500).json({ error: "could not create procedure" });
  }
});

module.exports = router;
