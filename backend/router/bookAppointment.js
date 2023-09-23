const express = require("express");
const router = express.Router();
require("../db/conn");
const AppointmentBook = require("../modals/bookAppointment.js");

router.post("/api/bookAppointment", async (req, res) => {
  const { FirstName, LastName, Phone, Slot, Department, Status } = req.body;

  if (!FirstName || !LastName || !Phone || !Slot || !Department || !Status) {
    return res.json({ error: "please Data Enter Properly", status: false });
  }

  try {
    const Appointment = new AppointmentBook({
      FirstName,
      LastName,
      Phone,
      Slot,
      Department,
      Status,
    });

    await Appointment.save();

    res.json({ message: "Book Appointment  Successfully", status: 200 });
  } catch (err) {
    res.json({ message: "Invalid Book Appointment", status: false });
    console.log(err);
  }
});

router.get("/api/getAppointment", async (req, res) => {
  try {
    const listAppointment = await AppointmentBook.find();
    res.send({
      data: listAppointment,
      message: "Appointment list",
      status: 200,
    });
  } catch (ex) {
    res.json({ message: "Appointment list invalid", status: false });
    console.log(ex);
  }
});

router.get("/api/getDoctor/:id", async (req, res) => {
  try {
    const getDoctor = await doctors.findById({
      _id: req.params.id,
    });
    res.status(200).send({ data: getDoctor, status: 200 });
  } catch (ex) {
    res.json({ message: "Doctor  invalid", status: false });

    console.log(ex);
  }
});

router.put("/api/updateDoctor/:id", async (req, res) => {
  try {
    const updateDoctor = await doctors.updateOne(
      {
        _id: req.params.id,
      },
      req.body
    );
    res.send({
      data: updateDoctor,
      message: "Update Successfully",
      status: true,
    });
  } catch (ex) {
    res.json({ message: "Doctor not Update ", status: false });
  }
});

router.post("/api/deleteDoctor/:id", async (req, res) => {
  await doctors.deleteOne({
    _id: req.params.id,
  });
  res.send({ message: "Doctor Delete SuccessFully", status: 200 });
});

module.exports = router;
