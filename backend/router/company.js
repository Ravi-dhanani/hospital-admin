const express = require("express");
const router = express.Router();
require("../db/conn");
const companyes = require("../modals/company.js");

router.post("/addCompany", async (req, res) => {
  const { CompanyName, Email, Phone } = req.body;

  if (!CompanyName || !Email || !Phone) {
    return res.json({ error: "please Data Enter Properly" });
  }

  try {
    const companyExits = await companyes.findOne({ Email: Email });
    if (companyExits) {
      return res.json({ error: "EmailId  AlreadyExits" });
    } else {
      const company = new companyes({
        CompanyName,
        Email,
        Phone,
      });

      await company.save();

      res.json({ message: "Company Add Successfully", status: 200 });
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/getCompany", async (req, res) => {
  try {
    const lstCompany = await companyes.find();
    res.status(200).send({ data: lstCompany, status: 200 });
  } catch (ex) {
    console.log(ex);
  }
});

router.get("/getCompany/:id", async (req, res) => {
  try {
    const lstCompany = await companyes.findById({
      _id: req.params.id,
    });
    res.status(200).send({ data: lstCompany, status: 200 });
  } catch (ex) {
    console.log(ex);
  }
});

router.put("/updateCompany/:id", async (req, res) => {
  try {
    const lstCompany = await companyes.updateOne(
      {
        _id: req.params.id,
      },
      req.body
    );
    res.status(200).send({ message: "Update Successfully", status: 200 });
  } catch (ex) {
    console.log(ex);
  }
});

router.post("/deleteCompany/:id", async (req, res) => {
  await companyes.deleteOne({
    _id: req.params.id,
  });
  res.send({ message: "company Delete success", status: 200 });
});

module.exports = router;
