const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("../db/conn");
const employees = require("../modals/employees.js");

router.post("/addEmployee", async (req, res) => {
  const { Name, Email, Phone, Work, Age, Gender, City, State, Country } =
    req.body;

  if (
    !Name ||
    !Email ||
    !Phone ||
    !Work ||
    !Age ||
    !Gender ||
    !City ||
    !State ||
    !Country
  ) {
    return res.status(422).json({ error: "please Data Enter Properly" });
  }
  try {
    const EmployeeExits = await employees.findOne({ Email: Email });
    if (EmployeeExits) {
      return res.status(422).json({ error: "EmailId  AlreadyExits" });
    } else {
      const employee = new employees({
        Name,
        Email,
        Phone,
        Work,
        Age,
        Gender,
        City,
        State,
        Country,
      });

      const employeeAdd = await employee.save();

      res
        .status(201)
        .json({ message: "Employee Add Successfully", status: 200 });
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/getEmployees", async (req, res) => {
  try {
    const lstEmployees = await employees.find();
    res.status(200).send({ data: lstEmployees, status: 200 });
  } catch (ex) {
    console.log(ex);
  }
});

router.get("/getEmployee/:id", async (req, res) => {
  try {
    const lstEmployees = await employees.findById({
      _id: req.params.id,
    });
    res.status(200).send({ data: lstEmployees, status: 200 });
  } catch (ex) {
    console.log(ex);
  }
});

router.post("/deleteEmployee/:id", async (req, res) => {
  console.log(req.params.id);
  const data = await employees.deleteOne({
    _id: req.params.id,
  });
  console.log(data);
  res.send({ message: "recode Delete success", status: 200 });
});

router.get("/getEmployees", async (req, res) => {
  try {
    const lstEmployees = await employees.find();
    res.status(200).send({ data: lstEmployees, status: 200 });
  } catch (ex) {
    console.log(ex);
  }
});

router.get("/getEmployee/:id", async (req, res) => {
  try {
    const lstEmployees = await employees.findById({
      _id: req.params.id,
    });
    res.status(200).send({ data: lstEmployees, status: 200 });
  } catch (ex) {
    console.log(ex);
  }
});

router.post("/deleteEmployee/:id", async (req, res) => {
  console.log(req.params.id);
  const data = await employees.deleteOne({
    _id: req.params.id,
  });
  console.log(data);
  res.send({ message: "recode Delete success", status: 200 });
});

module.exports = router;
