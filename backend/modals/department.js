const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({
  DepartmentName: {
    type: String,
    require: true,
  },
  Status: {
    type: String,
    require: true,
  },

  Descriptions: {
    type: String,
    require: true,
  },
});
const departments = mongoose.model("department", departmentSchema);

module.exports = departments;
