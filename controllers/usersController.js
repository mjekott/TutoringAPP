const User = require("../models/User");
const { validationResults } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { SECRET } = process.env;

/**
 * @route   POST api/auth/login
 * @desc    Auth user(student,tutor,admin) and get token
 * @access  Public
 */
exports.loginUser = async (req, res) => {
  //Check for errors
  const errors = validationResults(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // else
  // destructure reequest body
  const { email, password } = req.body;

  try {
    // initialize user
    let user = await User.fineOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ message: "Invalid credentials", statusCode: 400 });

    // else
    // check the password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res
        .status(400)
        .json({ statusCode: 400, message: "Invalid credentials" });

    // else
    // there's a match,send token
    // Send payload,and signed token

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      SECRET,
      {
        expiresIn: "1d",
      },
      (err, token) => {
        if (err) throw err;
        res.json({
          message: "Logged in successfully",
          statusCode: 200,
          token,
        });
      }
    );
  } catch (error) {}
};

/**
 * @route   GET api/auth/
 * @desc    Return currently authenticated user details
 * @access  Public
 */
exports.getLoggedInUser = async (req, res) => {
  try {
    // Get user from db
    const user = User.finById(req.user.id).select("-password");

    //return user
    res.json({
      statusCode: 200,
      message: "User gotten successfully",
      user,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};
