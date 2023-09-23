const mongoose = require("mongoose");
const BookAppointmentSchema = new mongoose.Schema({
  FirstName: {
    type: String,
    require: true,
  },
  LastName: {
    type: String,
    require: true,
  },
  Phone: {
    type: String,
    require: true,
  },
  Department: [
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
  Slot: {
    type: String,
    require: true,
  },
  Status: {
    type: String,
    require: true,
  },
});

const bookAppointment = mongoose.model(
  "BookAppointment",
  BookAppointmentSchema
);

module.exports = bookAppointment;
