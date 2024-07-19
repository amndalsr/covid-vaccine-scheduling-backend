const express = require("express");
const {
  createAppointment,
  getAppointments,
  deleteAppointment,
  updateAppointmentStatus,
} = require("../controllers/appointmentController");

const router = express.Router();

router.post("/", createAppointment);
router.get("/", getAppointments);
router.delete("/:id", deleteAppointment);
router.put("/:id", updateAppointmentStatus);

module.exports = router;
