const {
  createAppointment,
  getAppointments,
  deleteAppointment,
  updateAppointmentStatus,
} = require("../../controllers/appointmentController");

jest.mock("fs");
const fs = require("fs");

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

beforeEach(() => {
  fs.readFileSync.mockReturnValue(JSON.stringify(mockData));
  fs.writeFileSync.mockReturnValue();
});

describe("Appointment Controller", () => {
  it("should create a new appointment", () => {
    const req = {
      body: {
        name: "Amanda Laís",
        birthDate: "2001-05-10",
        appointmentDate: "2024-07-18",
        appointmentTime: "18:00",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    createAppointment(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Appointment created successfully",
        appointment: expect.objectContaining(req.body),
      })
    );
  });

  it("should get all appointments", () => {
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    getAppointments(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        groupedAppointments: expect.any(Object),
      })
    );
  });

  it("should delete an appointment", () => {
    const req = { params: { id: "1" } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    deleteAppointment(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Appointment deleted successfully",
      })
    );
  });

  it("should update appointment status", () => {
    const req = {
      params: { id: "1" },
      body: { completed: true },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    updateAppointmentStatus(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Appointment status updated successfully",
      })
    );
  });
});
