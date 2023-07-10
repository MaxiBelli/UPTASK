import User from "../models/User.js";
import generateId from "../helpers/generateId.js";
import generateJWT from "../helpers/generateJWT.js";
import { emailRegistration } from "../helpers/email.js";

const register = async (req, res) => {
  // Avoid duplicate registrations
  const { email } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    const error = new Error("User already registered");
    return res.status(400).json({ msg: error.message });
  }
  try {
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
      msg: "User created successfully. Check your email to confirm your account.",
    });
  } catch (error) {
    console.log(error);
  }
};

const authenticate = async (req, res) => {
  const { email, password } = req.body;

  // Check if the user exists
  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error("User does not exist");
    return res.status(404).json({ msg: error.message });
  }

  // Check if the user is confirmed
  if (!user.confirmed) {
    const error = new Error("Your account has not been confirmed");
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
    const error = new Error("Incorrect password");
    return res.status(403).json({ msg: error.message });
  }
};

const confirm = async (req, res) => {
  const { token } = req.params;
  const userConfirm = await User.findOne({ token });
  if (!userConfirm) {
    const error = new Error("Invalid token");
    return res.status(403).json({ msg: error.message });
  }

  try {
    userConfirm.confirmed = true;
    userConfirm.token = "";
    await userConfirm.save();
    res.json({ msg: "User confirmed successfully" });
  } catch (error) {
    console.log(error);
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error("User does not exist");
    return res.status(404).json({ msg: error.message });
  }

  try {
    user.token = generateId();
    await user.save();

    res.json({ msg: "We have sent an email with instructions" });
  } catch (error) {
    console.log(error);
  }
};

const checkToken = async (req, res) => {
  const { token } = req.params;

  const validToken = await User.findOne({ token });

  if (validToken) {
    res.json({ msg: "Token is valid and the user exists" });
  } else {
    const error = new Error("Invalid token");
    return res.status(404).json({ msg: error.message });
  }
};

const newPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const user = await User.findOne({ token });

  if (user) {
    user.password = password;
    user.token = "";
    try {
      await user.save();
      res.json({ msg: "Password modified successfully" });
    } catch (error) {
      console.log(error);
    }
  } else {
    const error = new Error("Invalid token");
    return res.status(404).json({ msg: error.message });
  }
};

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
