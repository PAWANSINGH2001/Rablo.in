const twilio = require("twilio");
const otpGenerator = require("otp-generator");

// Initialize Twilio client with your Twilio credentials
const twilioClient = twilio(
  "AC6e6f0c0d9662eaafe360210b40b68845",
  "09191056b21252d38e4136fdbfa136fd"
);

// Middleware function to send OTP and verify
function otpMiddleware(req, res, next) {
  const mobileNumber = req.body.mobileNumber;
  // Generate a 6-digit OTP using OTP-Generator
  const otp = otpGenerator.generate(6, {
    alphabets: false,
    upperCase: false,
    specialChars: false,
  });
  // Sending OTP via Twilio
  sendOTP(mobileNumber, otp) //function to send OTP
    .then((message) => {
      console.log(`OTP sent to +91${mobileNumber}: ${otp}`);
      // Storing the OTP in session
      req.session.otp = otp;
      res.status(201).send("OTP sent successfully");
    })
    .catch((err) => {
      console.error("Error sending OTP:", err);
      res.status(500).send("Error sending OTP");
    });
}
// Function to send OTP via Twilio
function sendOTP(mobileNumber, otp) {
  return twilioClient.messages.create({
    body: `Your OTP is ${otp}`,
    to: `+91${mobileNumber}`,
    from: "+15075025317",
  });
}

// Middleware function to verify OTP
function verifyOTPMiddleware(req, res, next) {
  //extracting entered OTP by user from req.body
  const enteredOTP = req.body.otp;
  //extracting the sent OTP from req.session
  const storedOTP = req.session.otp;
  //checking if both of them are equal
  if (enteredOTP && storedOTP && enteredOTP === storedOTP) {
    // Clear OTP from session once verified
    delete req.session.otp;
    next();
  } else {
    res.status(400).send("Invalid OTP");
  }
}

module.exports = {
  otpMiddleware,
  verifyOTPMiddleware,
};
