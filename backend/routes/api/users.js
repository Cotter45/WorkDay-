const express = require("express");
const { check } = require("express-validator");
const asyncHandler = require("express-async-handler");

const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");

const router = express.Router();

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors,
];


// const validateSignup = [
//   check("email")
//     .isEmail()
//     .withMessage("Please provide a valid email.")
//     .custom((value, { req }) => {
//       return new Promise((resolve, reject) => {
//         User.findOne({ where: { email: req.body.email } })
//           .then((res) => {
//             console.log("res.....", res);
//             if (res) {
//               reject("Email already taken");
//             } else {
//               resolve();
//             }
//           })
//           .catch((err) => {
//             rej("Database error: ", err.message);
//           });
//       });
//     }),
//   check("username")
//     .isLength({ min: 4 })
//     .withMessage("Please provide a username with at least 4 characters.")
//     .custom((value, { req }) => {
//       return new Promise((resolve, reject) => {
//         User.findOne({ where: { username: req.body.username } })
//           .then((res) => {
//             if (res) {
//               reject("Username already taken");
//             } else {
//               resolve();
//             }
//           })
//           .catch((err) => {
//             rej("Database error: ", err.message);
//           });
//       });
//     }),
//   check("username").not().isEmail().withMessage("Username cannot be an email."),
//   check("password")
//     .isLength({ min: 6 })
//     .withMessage("Password must be 6 characters or more."),
//   handleValidationErrors,
// ];

// Sign up
router.post(
  '',
  validateSignup,
  asyncHandler(async (req, res) => {
    const { email, password, username } = req.body;
    const user = await User.signup({ email, username, password });

    await setTokenCookie(res, user);

    return res.json({
      user,
    });
  }),
);

module.exports = router;