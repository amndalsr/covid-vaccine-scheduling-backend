const request = require("supertest");
const express = require("express");
const bodyParser = require("body-parser");
const appointmentRoutes = require("../../routes/appointments");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(bodyParser.json());
app.use("/api/appointments", appointmentRoutes);

jest.mock("fs");

const mockData = [
  {
    id: 1,
    name: "Amanda Laís",
    birthDate: "2001-05-10",
    appointmentDate: "2024-07-25",
    appointmentTime: "14:50",
    completed: false,
  },
];

describe("Appointment Routes", () => {
  beforeEach(() => {
    fs.readFileSync.mockReturnValue(JSON.stringify(mockData));
    fs.writeFileSync.mockReturnValue();
  });

  it("should create a new appointment", async () => {
    const newAppointment = {
      name: "Amanda Laís",
      birthDate: "2001-05-10",
      appointmentDate: "2024-07-18",
      appointmentTime: "18:00",
    };

    const response = await request(app)
      .post("/api/appointments")
      .send(newAppointment);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty(
      "message",
      "Appointment created successfully"
    );
    expect(response.body.appointment).toMatchObject(newAppointment);
  });

  it("should get appointments", async () => {
    const response = await request(app).get("/api/appointments");

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("groupedAppointments");
  });

  it("should delete an appointment", async () => {
    const response = await request(app).delete("/api/appointments/1");

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty(
      "message",
      "Appointment deleted successfully"
    );
  });

  it("should update appointment status", async () => {
    const response = await request(app)
      .put("/api/appointments/1")
      .send({ completed: true });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty(
      "message",
      "Appointment status updated successfully"
    );
  });
});
