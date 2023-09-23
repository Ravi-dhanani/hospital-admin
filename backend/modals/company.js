const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  CompanyName: {
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
});

const company = mongoose.model("company", companySchema);

module.exports = company;
