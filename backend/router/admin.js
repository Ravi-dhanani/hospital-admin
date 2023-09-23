const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("../db/conn");
const Admin = require("../modals/admin");

router.post("/admin/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(422).json({ error: "please Data Enter Properly" });
  }
  try {
    const adminExits = await Admin.findOne({ email: email });
    if (adminExits) {
      return res.status(422).json({ error: "EmailId  AlreadyExits" });
    } else {
      const admin = new Admin({
        name,
        email,
        password,
      });

      const adminRegister = await admin.save();
      console.log(adminRegister);
      res.status(201).json({ message: "Admin Register Successfully" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/admin/getAdmins", async (req, res) => {
  try {
    const listAdmins = await Admin.find();
    console.log(listAdmins);
    res.send({
      data: listAdmins,
      message: "Admins list",
      status: 200,
    });
  } catch (ex) {
    res.json({ message: "admin list invalid", status: false });
    console.log(ex);
  }
});

router.post("/admin/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Please Filled the data" });
    }
    const adminLogin = await Admin.findOne({ email: email });
    const data = await Admin.findOne({ name: "admin" });
    console.log(data);
    if (adminLogin) {
      const isMatch = await bcrypt.compare(password, adminLogin.password);
      const token = await adminLogin.generateToken();
      if (!isMatch) {
        return res.status(400).json({ error: "Invalid Credientials" });
      } else {
        return res.status(200).json({
          message: "Admin login Successfully",
          token: token,
          data: {
            name: data.name,
            email: data.email,
            loginStatus: true,
          },
          status: 200,
        });
      }
      console.log(res);
    } else {
      return res.status(400).json({ error: "Invalid Credientials" });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
