const express = require("express");
const router = express.Router();
require("../db/conn");
const slot = require("../modals/slot.js");

router.post("/api/addSlot", async (req, res) => {
  const { SlotDate, SlotTime, Department, isBooked } = req.body;

  if (!SlotDate || !SlotTime || !Department || !isBooked) {
    return res.json({ error: "please Data Enter Properly", status: false });
  }

  try {
    const SlotExits = await slot.findOne({ SlotDate: SlotDate });
    if (SlotExits) {
      return res.json({ error: "Slot  AlreadyExits" });
    } else {
      const Slot = new slot({
        SlotDate,
        SlotTime,
        Department,
        isBooked,
      });

      await Slot.save();

      res.json({ message: "Slot Add Successfully", status: 200 });
    }
  } catch (err) {
    res.json({ message: "Invalid Doctor", status: false });
    console.log(err);
  }
});

router.get("/api/getDoctors", async (req, res) => {
  try {
    const listDoctors = await doctors.find();
    res.send({ data: listDoctors, message: "Doctor list", status: 200 });
  } catch (ex) {
    res.json({ message: "Doctor list invalid", status: false });
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
  await doctors.findByIdAndRemove(req.params.id).then((data) => {
    if (!data) {
      return res.status(404).send({
        success: false,
        message: "User not found with id " + req.params.id,
      });
    }
    res.send({
      success: true,
      message: "User successfully deleted!",
    });
  });

  // router.delete('/delete/:id', deleteUser);
  // res.send({ message: "Doctor Delete SuccessFully", status: 200 });
});

module.exports = router;
