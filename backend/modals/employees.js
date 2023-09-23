const mongoose = require("mongoose");

const employeesSchema = new mongoose.Schema({
  Name: {
    type: String,
    require: true,
  },
  Email: {
    type: String,
    require: true,
  },
  Phone: {
    type: Number,
    require: true,
  },
  Work: {
    type: String,
    require: true,
  },
  Age: {
    type: Number,
    require: true,
  },
  Gender: {
    type: String,
    require: true,
  },
  City: {
    type: String,
    require: true,
  },
  State: {
    type: String,
    require: true,
  },
  Country: {
    type: String,
    require: true,
  },
});

const employees = mongoose.model("employees", employeesSchema);

module.exports = employees;
