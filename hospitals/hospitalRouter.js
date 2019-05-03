const express = require("express");
const router = express.Router();
const Hospitals = require("../hospitals/hospitalHelpers");
const { dumpError } = require("../utils/dumpError");
const { authenticate, authorize } = require("../auth/authMiddleware");

router.get("/", async (req, res) => {
  const query = req.params;
  try {
    const hospitals = await Hospitals.get(query);
    res.status(200).json(hospitals);
  } catch (e) {
    dumpError(e);
    res.status(500).json({ error: "could not get hospitals" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const hospital = await Hospitals.getById(id);
    res.status(200).json(hospital);
  } catch (e) {
    dumpError(e);
    res.status(500).json({ error: "could not get hospital" });
  }
});

router.post("/", authenticate, async (req, res) => {
  const hospitalInfo = req.body;
  try {
    const newHospital = await Hospitals.insert(hospitalInfo);
    res.status(201).json(newHospital);
  } catch (e) {
    dumpError(e);
    res.status(500).json({ error: "could not create hospital" });
  }
});

router.put("/:hospitalId", authenticate, async (req, res) => {
  const changes = req.body;
  const { hospitalId } = req.params;
  try {
    const updatedHosptial = await Hospitals.update(hospitalId, changes);
    res.status(201).json(updatedHosptial);
  } catch (e) {
    dumpError(e);
    res.status(500).json({ error: "could not update hospitals" });
  }
});

router.delete("/:hospitalId", authenticate, async (req, res) => {
  const { hospitalId } = req.params;
  try {
    const updatedHosptial = await Hospitals.remove(hospitalId);
    res.status(201).json({ message: "hospital removed" });
  } catch (e) {
    dumpError(e);
    res.status(500).json({ error: "could not remove hospital" });
  }
});

module.exports = router;
