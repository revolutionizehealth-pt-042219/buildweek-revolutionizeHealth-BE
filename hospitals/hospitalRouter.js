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
    console.log("newHospital", newHospital);
    res.status(201).json(newHospital);
  } catch (e) {
    dumpError(e);
    res.status(500).json({ error: "could not create hospital" });
  }
});

// router.put("/:procedureId", authenticate, async (req, res) => {
//   const changes = req.body;
//   const { procedureId } = req.params;
//   try {
//     const [procedure] = await Procedures.getById(procedureId);
//     const { hospital_id, doctor_id } = procedure;
//     //if the user who made the procedure is not the one trying to edit
//     if (procedure.id !== req.decoded.id) {
//       res.status(401).json({ error: "Not Authorized To Edit Procedure" });
//     } else {
//       const newProcedure = await Procedures.update(
//         procedureId,
//         changes,
//         hospital_id,
//         doctor_id
//       );
//       console.log("newProcedure", newProcedure);
//       res.status(201).json(newProcedure);
//     }
//   } catch (e) {
//     dumpError(e);
//     res.status(500).json({ error: "could not create procedure" });
//   }
// });

module.exports = router;
