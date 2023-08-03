import User from "../models/User.js";
import generateId from "../helpers/generateId.js";
import generateJWT from "../helpers/generateJWT.js";
import { emailRegistration, emailForgotPassword } from "../helpers/email.js";

// REGISTER USER
const register = async (req, res) => {
  const { email } = req.body;

  // Check if the user is already registered
  const userExists = await User.findOne({ email });

  if (userExists) {
    const error = new Error("User already Registered");
    return res.status(400).json({ msg: error.message });
  }

  try {
    // Create a new user and save it to the database
    const user = new User(req.body);
    user.token = generateId();
    await user.save();

    // Send the confirmation email
    emailRegistration({
      email: user.email,
      name: user.name,
      token: user.token,
    });

    res.json({
      msg: `User Created Successfully. Check your Email Address ${email} to Confirm your Account.`,
    });
  } catch (error) {
    console.log(error);
  }
};

// AUTHENTICATE USER
const authenticate = async (req, res) => {
  const { email, password } = req.body;

  // Check if the user exists
  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error("User does Not Exist");
    return res.status(404).json({ msg: error.message });
  }

  // Check if the user is confirmed
  if (!user.confirmed) {
    const error = new Error("Your Account has Not been Confirmed");
    return res.status(403).json({ msg: error.message });
  }

  // Check their password
  if (await user.checkPassword(password)) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateJWT(user._id),
    });
  } else {
    const error = new Error("Incorrect Password");
    return res.status(403).json({ msg: error.message });
  }
};

// CONFIRM USER
const confirm = async (req, res) => {
  const { token } = req.params;
  const userConfirm = await User.findOne({ token });
  if (!userConfirm) {
    const error = new Error("Invalid Token");
    return res.status(403).json({ msg: error.message });
  }

  try {
    // Confirm the user and save the changes
    userConfirm.confirmed = true;
    userConfirm.token = "";
    await userConfirm.save();
    res.json({ msg: "User Confirmed Successfully" });
  } catch (error) {
    console.log(error);
  }
};

// FORGOT PASSWORD
const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error("User does Not Exist");
    return res.status(404).json({ msg: error.message });
  }

  try {
    // Generate a new token and save it to the database
    user.token = generateId();
    await user.save();

    // Send the password reset email
    emailForgotPassword({
      email: user.email,
      name: user.name,
      token: user.token,
    });

    res.json({
      msg: `Please Check the Email Address ${email} for Instructions to Reset your Password.`,
    });
  } catch (error) {
    console.log(error);
  }
};

// CHECK TOKEN
const checkToken = async (req, res) => {
  const { token } = req.params;

  const validToken = await User.findOne({ token });

  if (validToken) {
    res.json({ msg: "Token is Valid and the User Exists" });
  } else {
    const error = new Error("Invalid token");
    return res.status(404).json({ msg: error.message });
  }
};

// NEW PASSWORD
const newPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const user = await User.findOne({ token });

  if (user) {
    // Update the user's password and clear the token
    user.password = password;
    user.token = "";
    try {
      await user.save();
      res.json({ msg: "Password Modified Successfully" });
    } catch (error) {
      console.log(error);
    }
  } else {
    const error = new Error("Invalid Token");
    return res.status(404).json({ msg: error.message });
  }
};

// USER PROFILE
const profile = async (req, res) => {
  const { user } = req;

  res.json(user);
};

export {
  register,
  authenticate,
  confirm,
  forgotPassword,
  checkToken,
  newPassword,
  profile,
};
