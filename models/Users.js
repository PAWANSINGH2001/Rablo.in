const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First name is required"],
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
  },
  dateOfBirth: {
    type: String,
    required: [true, "Date of birth is required"],
  },
  gender: {
    type: String,
    required: [true, "Gender is required"],
  },
  mobileNumber: {
    type: String,
    required: [true, "Student mobile number is required"],
  },
  guardianMobileNumber: {
    type: String,
    required: [true, "Guardian mobile number is required"],
  },
  houseNumber: {
    type: String,
    required: [true, "House number is required"],
  },
  city: {
    type: String,
    required: [true, "City number is required"],
  },
  state: {
    type: String,
    required: [true, "State number is required"],
  },
  pinCode: {
    type: String,
    required: [true, "Pin code number is required"],
  },
  referralCode: {
    type: String,
    required: [true, "Referral code is required"],
  },
  school: {
    type: String,
    required: [true, "School is required"],
  },
  class: {
    type: String,
    required: [true, "Class is required"],
  },
  board: {
    type: String,
    required: [true, "Board is required"],
  },
  subjects: {
    type: [String],
    required: true,
  },
});

module.exports = mongoose.model("user", userSchema);
