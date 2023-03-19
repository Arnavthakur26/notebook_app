const express = require("express");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
var fetchUser = require("../middleware/fetchUser");
const router = express.Router();

const JWT_SECRET = "notebookapp";

// ROUTE 1: Create user at /api/auth/createUser. No authentication required
router.post(
  "/createUser",
  [
    body("name", "Enter a valid name").isLength({ min: 5 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Enter valid password").isLength({ min: 8 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    //check if user with same email already exists
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "User with same email already exists" });
      }

      //generating hash for password
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      //create user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      const data = {
        user: {
          id: user.id,
        },
      };
      const jwtData = jwt.sign(data, JWT_SECRET);
      res.status(200).json({ token: jwtData });
    } catch (err) {
      res.status(500).send("Some error occured");
    }
  }
);

//ROUTE 2: login endpoint
router.post(
  "/login",
  [
    body("email", "Enter valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        success = false;
        return res.status(400).json({ error: "Credentials does not match" });
      }
      const passCompare = await bcrypt.compare(password, user.password);
      if (!passCompare) {
        success = false;
        return res.status(400).json({ errors: "Credentials does not match" });
      }
      const payload = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(payload, JWT_SECRET);
      success = true;
      res.json({ success, authToken });
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  }
);

//ROUTE 3: Get user from jwt, Login required
router.post("/getUser", fetchUser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {}
});
module.exports = router;
