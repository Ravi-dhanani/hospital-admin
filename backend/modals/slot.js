const mongoose = require("mongoose");
const SlotSchema = new mongoose.Schema({
  SlotDate: {
    type: String,
    require: true,
  },
  SlotTime: {
    type: String,
    require: true,
  },
  Department: {
    type: String,
    require: true,
  },

  isBooked: {
    type: Boolean,
    require: true,
  },
});

const slot = mongoose.model("Slot", SlotSchema);

module.exports = slot;
