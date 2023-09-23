const express = require("express");
const router = express.Router();
require("../db/conn");
const departments = require("../modals/department.js");

router.post("/api/addDepartment", async (req, res) => {
  const { DepartmentName, Descriptions, Status } = req.body;

  if (!DepartmentName || !Descriptions || !Status) {
    return res.json({ error: "please Data Enter Properly" });
  }

  try {
    const departmentExits = await departments.findOne({
      DepartmentName: DepartmentName,
    });
    if (departmentExits) {
      return res.json({ error: "Department   AlreadyExits" });
    } else {
      const departmentData = new departments({
        DepartmentName,
        Descriptions,
        Status,
      });

      await departmentData.save();

      res.json({ message: "Department Add Successfully", status: 200 });
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/api/getDepartment", async (req, res) => {
  try {
    const lstDepartment = await departments.find();
    res.status(200).send({ data: lstDepartment, status: 200 });
  } catch (ex) {
    console.log(ex);
  }
});

router.get("/api/getDepartment/:id", async (req, res) => {
  try {
    const lstDepartment = await departments.findById({
      _id: req.params.id,
    });
    res.status(200).send({ data: lstDepartment, status: 200 });
  } catch (ex) {
    console.log(ex);
  }
});

router.put("/api/updateDepartment/:id", async (req, res) => {
  try {
    const lstCompany = await departments.updateOne(
      {
        _id: req.params.id,
      },
      req.body
    );
    res
      .status(200)
      .send({ message: "Update Successfully", data: lstCompany, status: 200 });
  } catch (ex) {
    console.log(ex);
  }
});

router.post("/api/deleteDepartment/:id", async (req, res) => {
  await departments.deleteOne({
    _id: req.params.id,
  });
  res.send({ message: "Department Delete success", status: 200 });
});

module.exports = router;
