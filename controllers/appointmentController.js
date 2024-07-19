const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "../appointments.json");

const loadAppointments = () => {
  if (fs.existsSync(filePath)) {
    try {
      const data = fs.readFileSync(filePath, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      console.error("Error reading appointments.json:", error);
      return [];
    }
  }
  return [];
};

const saveAppointments = (appointments) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(appointments, null, 2));
  } catch (error) {
    console.error("Error writing to appointments.json:", error);
  }
};

const generateId = () => {
  const appointments = loadAppointments();
  return appointments.length
    ? Math.max(...appointments.map((app) => app.id)) + 1
    : 1;
};

const createAppointment = (req, res) => {
  const { name, birthDate, appointmentDate, appointmentTime } = req.body;

  if (!name || !birthDate || !appointmentDate || !appointmentTime) {
    return res.status(400).json({ message: "All fields are required" });
  }

  let appointments = loadAppointments();

  const dateAppointments = appointments.filter(
    (app) => app.appointmentDate === appointmentDate
  );

  if (dateAppointments.length >= 20) {
    return res
      .status(400)
      .json({ message: "No more appointments available for this date" });
  }

  const timeAppointments = dateAppointments.filter(
    (app) => app.appointmentTime === appointmentTime
  );

  if (timeAppointments.length >= 2) {
    return res
      .status(400)
      .json({ message: "No more appointments available for this time" });
  }

  const newAppointment = {
    id: generateId(),
    name,
    birthDate,
    appointmentDate,
    appointmentTime,
    completed: false,
  };

  appointments.push(newAppointment);
  saveAppointments(appointments);
  res.status(201).json({
    message: "Appointment created successfully",
    appointment: newAppointment,
  });
};

const getAppointments = (req, res) => {
  const appointments = loadAppointments();
  const groupedAppointments = appointments.reduce((acc, appointment) => {
    const key = `${appointment.appointmentDate} ${appointment.appointmentTime}`;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(appointment);
    return acc;
  }, {});

  res.status(200).json({ groupedAppointments });
};

const deleteAppointment = (req, res) => {
  const { id } = req.params;
  const appointmentId = parseInt(id);

  if (isNaN(appointmentId)) {
    return res.status(400).json({ message: "Invalid appointment ID" });
  }

  const appointments = loadAppointments();
  const appointmentIndex = appointments.findIndex(
    (app) => app.id === appointmentId
  );

  if (appointmentIndex === -1) {
    return res.status(404).json({ message: "Appointment not found" });
  }

  appointments.splice(appointmentIndex, 1);
  saveAppointments(appointments);
  res.status(200).json({ message: "Appointment deleted successfully" });
};

const updateAppointmentStatus = (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  const appointmentId = parseInt(id);

  if (isNaN(appointmentId)) {
    return res.status(400).json({ message: "Invalid appointment ID" });
  }

  const appointments = loadAppointments();
  const appointment = appointments.find((app) => app.id === appointmentId);

  if (!appointment) {
    return res.status(404).json({ message: "Appointment not found" });
  }

  appointment.completed = completed;
  saveAppointments(appointments);
  res.status(200).json({ message: "Appointment status updated successfully" });
};

module.exports = {
  createAppointment,
  getAppointments,
  deleteAppointment,
  updateAppointmentStatus,
};
