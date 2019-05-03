const express = require("express");
const router = express.Router();
const Doctors = require("./doctorsHelpers");
const { dumpError } = require("../utils/dumpError");
const { authenticate, authorize } = require("../auth/authMiddleware");

router.get("/", async (req, res) => {
  const query = req.params;
  try {
    const doctors = await Doctors.get(query);
    res.status(200).json(doctors);
  } catch (e) {
    dumpError(e);
    res.status(500).json({ error: "could not get doctors" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const doctor = await Doctors.getById(id);
    res.status(200).json(doctor);
  } catch (e) {
    dumpError(e);
    res.status(500).json({ error: "could not get doctor" });
  }
});

router.post("/", authenticate, async (req, res) => {
  const doctorInfo = req.body;
  try {
    const newDoctor = await Doctors.insert(doctorInfo);
    res.status(201).json(newDoctor);
  } catch (e) {
    dumpError(e);
    res.status(500).json({ error: "could not create doctor" });
  }
});

router.put("/:doctorId", authenticate, async (req, res) => {
  const changes = req.body;
  const { doctorId } = req.params;
  try {
    const updatedDoctor = await Doctors.update(doctorId, changes);
    res.status(201).json(updatedDoctor);
  } catch (e) {
    dumpError(e);
    res.status(500).json({ error: "could not update doctors" });
  }
});

router.delete("/:doctorId", authenticate, async (req, res) => {
  const { doctorId } = req.params;
  try {
    await Doctors.remove(doctorId);
    res.status(201).json({ message: "doctor removed" });
  } catch (e) {
    dumpError(e);
    res.status(500).json({ error: "could not remove doctor" });
  }
});

module.exports = router;
