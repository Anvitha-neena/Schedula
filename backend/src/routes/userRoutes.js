const express = require("express");
const {
  registerUser,
  loginUser,
  getCurrentUser,
  updateCurrentUser,
  getUsers,
  createUserByAdmin,
  updateUserByAdmin,
  deleteUserByAdmin,
} = require("../controllers/userController");
const {
  registerValidation,
  loginValidation,
  updateProfileValidation,
  adminUserValidation,
} = require("../validators/userValidators");
const validate = require("../middleware/validate");
const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const router = express.Router();

router.post("/register", registerValidation, validate, registerUser);
router.post("/login", loginValidation, validate, loginUser);
router.get("/me", auth, getCurrentUser);
router.put("/me", auth, updateProfileValidation, validate, updateCurrentUser);
router.get("/", auth, admin, getUsers);
router.post("/", auth, admin, adminUserValidation, validate, createUserByAdmin);
router.put("/:id", auth, admin, updateProfileValidation, validate, updateUserByAdmin);
router.delete("/:id", auth, admin, deleteUserByAdmin);

module.exports = router;
