const User = require("../models/usersModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
const registerUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: "Please provide all fields" });
  }

  const alreadyExist = await User.findOne({ email });
  console.log("alreadyExist ", alreadyExist);
  if (alreadyExist) {
    return res.status(400).json({ message: "User already exist" });
  }

  //Hash the password
  var salt = bcrypt.genSaltSync(10);
  var hashedPassword = bcrypt.hashSync(password, salt);

  //create user Data

  const userData = { firstName, lastName, email, password: hashedPassword };
  const user = await User.create(userData);
  console.log(user._id);

  const userInfo = {
    ...user._doc,
    token: generateToken(user._id),
  };

  console.log(userInfo);
  res.status(201).json(userInfo);
};

//Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide email and password" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "User does not exist" });
  }

  //compare password
  const passwordMatch = bcrypt.compareSync(password, user.password);
  console.log(passwordMatch);
  if (!passwordMatch) {
    return res.status(400).json({ message: "Password mismatch" });
  }

  const userData = {
    ...user._doc,
    token: generateToken(user._id),
  };
  res.status(200).json(userData);
};

//Generate token
const generateToken = (id) => {
  return jwt.sign(
    {
      id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );
};

module.exports = {
  registerUser,
  loginUser,
};
