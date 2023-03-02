const express = require("express");
const { body } = require("express-validator");
const authController = require("../controllers/authController");
const router = express.Router();

router.post(
  "/signup-user",
  [
    body("email", "Kindly enter a valid email to proceed")
      .isEmail()
      .custom((value, { req }) => {
        return authController.findOne({ email: value }).then((accountDoc) => {
          if (accountDoc) {
            return Promise.reject(
              "Entered email address already exists! Kindly try again with another email id!"
            );
          }
        });
      })
      .normalizeEmail(),
    body("password", "Password field is empty!")
      .trim()
      .not()
      .isEmpty(),

    body("firstName", "First Name is empty! Please enter first name!")
    .trim()
    .not()
    .isEmpty(),

    body("lastName", "Last Name is empty! Please enter last name!").trim()
    .not()
    .isEmpty(),

    body("role", "Role field is empty!").trim()
    .not()
    .isEmpty(),

    body("confirmPassword")
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Passwords have to match!");
        }
        return true;
      }),
  ],
  authController.signupUser
);

router.get("/verify/:token", authController.verifyAccount);

router.post("/login", authController.login);

router.post(
  "/signup-seller",
  [
    body("email", "Kindly enter a valid email to proceed")
      .isEmail()
      .custom((value, { req }) => {
        return authController.findOne({ email: value }).then((accountDoc) => {
          if (accountDoc) {
            return Promise.reject(
              "Email address already exists, please try again with another business email."
            );
          }
        });
      })
      .normalizeEmail(),

    body("password", "Password should be at least 6 characters long")
      .trim()
      .isLength({ min: 6 }),

    body("name", "Restaurant Name cannot be empty")
    .trim()
    .not()
    .isEmpty(),

    body("payment", "Payment cannot be empty")
    .trim()
    .not()
    .isEmpty(),

    body("tags", "Tags cannot be empty")
    .trim()
    .not()
    .isEmpty(),

    body("street", "Street cannot be empty")
    .trim()
    .not()
    .isEmpty(),

    body("locality", "Locality cannot be empty")
    .trim()
    .not()
    .isEmpty(),

    body("aptName", 
    "Apartment Name is empty! Kindly enter Apartment Name!")
    .trim()
    .not()
    .isEmpty(),

    body("zip", "Zipcode is empty! Please enter zipcode!")
    .trim()
    .not()
    .isEmpty(),

    body("costForOne", "Cost for one field is empty!")
    .trim()
    .not()
    .isEmpty(),

    body("minOrderAmount", "Minimum Order Amount cannot be empty")
    .trim()
    .not()
    .isEmpty(),
    
    body("confirmPassword")
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match!");
      }
      return true;
    }),

    body("phoneNo", "Enter a valid 10 digit phone number")
      .trim()
      .isLength({ min: 10, max: 10 }),
  ],
  authController.signupSeller
);

router.post("/images-test", authController.imagesTest);

module.exports = router;
