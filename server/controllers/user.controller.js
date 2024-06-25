const { User } = require("../model/user.model"); // Use destructuring here
const UserOtp = require("../model/userOtp.model");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.BASE_URL, // replace with the origin of your client-side application
    credentials: true,
    methods: "GET,POST,PUT,DELETE",
  })
);
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL,
    pass: process.env.PASSWORD,
  },
});

module.exports.signup = async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    const newUser = new User(data);
    await newUser.save();
    const userToken = jwt.sign(
      {
        id: newUser._id,
      },
      "abcdef",
      { expiresIn: "1h" }
    );

    res
      .cookie("usertoken", userToken, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      })
      .status(200)
      .json({ message: "Registration successful", data: data });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Error in registration",
      error: error.message, // Send the error message in the response
    });
  }
};

module.exports.login = async (req, res) => {
  let user = await User.findOne({ username: req.body.username });
  if (!user) {
    return res.status(400).json({ msg: "Username does not match" });
  }

  try {
    let match = await bcrypt.compare(req.body.password, user.password);
    if (match) {
      const userToken = jwt.sign(
        {
          id: user._id,
        },
        "abcdef",
        { expiresIn: "1h" }
      );

      res
        .cookie("usertoken", userToken, {
          httpOnly: true,
          sameSite: "none",
          secure: true,
        })
        .status(200)
        .json({ message: "Success!", user: user });
    } else {
      res.status(400).json({ msg: "Password does not match" });
    }
  } catch (error) {
    res.status(500).json({ msg: "error while login the user" });
    console.log(error);
  }
};

module.exports.userLogout = async (req, res) => {
  try {
    res.clearCookie("usertoken");
    res.redirect(process.env.BASE_URL);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports.sendotpforforetpassword = async (req, res) => {
  console.log("Endpoint hit");
  const { email } = req.body;

  if (!email) {
    res.status(400).json({ error: "Please Enter Your Registered Email" });
    return;
  }

  try {
    const presuer = await User.findOne({ email: email });
    console.log("User found:", presuer);

    if (presuer) {
      const OTP = Math.floor(100000 + Math.random() * 900000);
      console.log("Generated OTP:", OTP);

      const existEmail = await UserOtp.findOne({ email: email });

      if (existEmail) {
        const updateData = await UserOtp.findByIdAndUpdate(
          { _id: existEmail._id },
          { otp: OTP },
          { new: true }
        );
        await updateData.save();
        console.log("Updated OTP for existing user");

        const mailOptions = {
          from: process.env.EMAIL,
          to: email,
          subject: "Sending Email For Otp Validation",
          text: `OTP for forgot password: ${OTP}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log("Error sending email:", error);
            res.status(400).json({ error: "email not send" });
          } else {
            console.log("Email sent:", info.response);
            res.status(200).json({ message: "Email sent Successfully" });
          }
        });
      } else {
        const saveOtpData = new UserOtp({ email, otp: OTP });
        await saveOtpData.save();
        console.log("Saved new OTP data");

        const mailOptions = {
          from: process.env.EMAIL,
          to: email,
          subject: "Sending Email For Otp Validation",
          text: `OTP: ${OTP}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log("Error sending email:", error);
            res.status(400).json({ error: "email not send" });
          } else {
            console.log("Email sent:", info.response);
            res.status(200).json({ message: "Email sent Successfully" });
          }
        });
      }
    } else {
      res.status(400).json({ error: "This User Not Exist In our Database" });
    }
  } catch (error) {
    console.log("Error:", error);
    res.status(400).json({ error: "Invalid Details", error });
  }
};
module.exports.otpverify = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const otpEmailed = await UserOtp.findOne({ email: email });
    console.log("1", otpEmailed);
    if (otpEmailed && otpEmailed.otp === otp) {
      otpEmailed.isOtpVerified = true;
      await otpEmailed.save();
      console.log("2", otpEmailed);
      res.status(200).json({
        message: "OTP verified successfully",
        email: email,
        otp: otp,
      });
    } else {
      res.status(400).json({
        message: "Incorrect OTP",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "Error verifying OTP",
      error: error,
    });
  }
};
module.exports.changeinfo = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });
    const otpEmailed = await UserOtp.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Check if OTP is verified
    if (!otpEmailed.isOtpVerified) {
      console.log("OTP not verified");
      return res.status(400).json({ message: "OTP not verified" });
    }

    user.password = password; // set the new password
    otpEmailed.isOtpVerified = false;
    await otpEmailed.save();
    await user.save(); // this will hash the password and save the user

    res.status(200).json({
      message: "Password reset successfully",
      myuser: user,
    });
  } catch (error) {
    res.status(500).json({ message: "Error resetting password", error: error });
  }
}


module.exports.updateUser = async (req, res) => {
  console.log(req.user);
  console.log("userndddame", req.body);

  if (req.user.id !== req.params.userId) {
    return res.status(403).json({ message: "You are not allowed to update this user" });
  }

  const updateFields = {};

  if (req.body.password) {
    if (req.body.password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    updateFields.password = hashedPassword; 
  }

  
  if (req.body.username) {
    if (req.body.username.length < 5 || req.body.username.length > 12) {
      return res.status(400).json({ message: "Username must be between 5 and 12 characters" });
    }
    if (req.body.username.includes(" ")) {
      return res.status(400).json({ message: "Username cannot contain spaces" });
    }
    if (req.body.username !== req.body.username.toLowerCase()) {
      return res.status(400).json({ message: "Username must be lowercase" });
    }
    if (!req.body.username.match(/^[a-zA-Z0-9_]+$/)) {
      return res.status(400).json({ message: "Username can only contain letters, numbers, and underscores" });
    }
    updateFields.username = req.body.username;
  }

  if (req.body.email !== undefined) {
    if (req.body.email.trim() === '') {
      return res.status(400).json({ error: "Email cannot be empty" });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(req.body.email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }
  
    updateFields.email = req.body.email;
  }
  
  
  if (req.body.PictureUrl) {
    updateFields.PictureUrl = req.body.PictureUrl;
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      { $set: updateFields },
      { new: true }
    ).lean();

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const { password, ...rest } = updatedUser;
    res.status(200).json(rest);
  } catch (error) {
    res.status(500).json({ message: "An error occurred while updating the user", error: error.message });
  }
};
