const router = require("express").Router();
const authcontrollers = require("../controllers/authcontrollers");
const otp_verification = require("../controllers/otp_verification");

//route to get all details using _id as a params
router.get("/student/:id", authcontrollers.get_studentDetail);

// below is verification route, firstly this is called with mobile number of the user,
// then the below route will send OTP to the user mobile number and store the sent OTP in req.session
router.post("/verify", otp_verification.otpMiddleware);

// below is post route for signup, after OTP is sent, this route will be called with the user details and OTP entered by the user, then this route will check if OTP entered by the user is same as the OTP sent (stored OTP in session), is both of them are equal, then signup will be successful.
router.post(
  "/signup",
  otp_verification.verifyOTPMiddleware,
  authcontrollers.post_signup
);

module.exports = router;
