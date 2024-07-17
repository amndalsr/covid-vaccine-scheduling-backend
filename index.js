const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let appointments = [];

app.post('/appointments', (req, res) => {
  const { name, birthDate, appointmentDate, appointmentTime } = req.body;  
  const newAppointment = { name, birthDate, appointmentDate, appointmentTime, status: 'pendente' };

  const sameTimeAppointments = appointments.filter(
    (appointment) =>
      appointment.appointmentDate === appointmentDate &&
      appointment.appointmentTime === appointmentTime
  );

  if (sameTimeAppointments.length >= 2) {
    return res.status(400).json({ message: 'Horário indisponível.' });
  }

  appointments.push(newAppointment);
  res.status(201).json(newAppointment);
});

app.get('/appointments', (req, res) => {
  res.json(appointments);
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
