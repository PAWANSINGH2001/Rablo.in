const User = require("../models/Users");
const path = require("path");

module.exports.get_studentDetail = async (req, res) => {
  try {
    //extracting student id from params
    const _id = req.params.id;
    //searching the student id in database
    const user = await User.findOne({ _id });
    res.send(user);
  } catch (err) {
    res.status(504).send("Error while fetching student details from database");
  }
};

module.exports.post_signup = async (req, res) => {
  try {
    //creating new user with the given details
    const newUser = new User(req.body);
    //saving user in database
    await newUser.save();
    // adding userid in req.body, used spread operator
    req.body = { ...req.body, _id: newUser._id };
    res.status(200).json({ status: "success", data: req.body });
  } catch (err) {
    res.status(504).send("Error in saving database");
  }
};
