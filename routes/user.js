const express = require("express");
const {
  register,
  login,
  updateProfile,
} = require("../controller/UserController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.put("/updatepassword", authMiddleware, updateProfile);

module.exports = router;
