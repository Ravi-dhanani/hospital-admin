const mongoose = require("mongoose");
const DoctorSchema = new mongoose.Schema({
  FirstName: {
    type: String,
    require: true,
  },
  LastName: {
    type: String,
    require: true,
  },
  Email: {
    type: String,
    require: true,
  },
  Phone: {
    type: String,
    require: true,
  },
  Image: {
    type: String,
    require: true,
  },
  Status: {
    type: String,
    require: true,
  },

  Specialty: [
    {
      _id: {
        type: String,
        require: true,
      },
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
    },
  ],
  // Specialty: {
  //   type: s,
  //   require: true,
  // },
});

const doctor = mongoose.model("Doctor", DoctorSchema);

module.exports = doctor;
