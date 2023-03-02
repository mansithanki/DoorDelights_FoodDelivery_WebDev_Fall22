const express = require("express");
const { body } = require("express-validator");

const userController = require("../controllers/userController");
const auth = require("../middleware/auth");

const expressRouter = express.Router();

expressRouter.get("/restaurants", 
userController.getRestaurants);

expressRouter.delete("/delete-restaurant/:restId", 
userController.deleteRestaurantById);

expressRouter.get("/restaurant/:restId", 
userController.getRestaurant);

expressRouter.post("/cart", 
auth.verifyUser, 
userController.postCart);

expressRouter.get("/cart", 
auth.verifyUser, 
userController.getCart);

expressRouter.post(
  "/delete-cart-item",
  auth.verifyUser,
  userController.postCartDelete
);

expressRouter.post(
  "/remove-cart-item/:itemId",
  auth.verifyUser,
  userController.postCartRemove
);

expressRouter.post(
  "/user/address",
  auth.verifyUser,
  [
    body("phoneNo", "Kindly enter a valid 10-digit phone number!")
      .trim()
      .isLength({ min: 10, max: 10 }),
    body("street", "Street Field is empty!").trim()
    .not()
    .isEmpty(),

    body("locality", "Locality cannot be empty").trim().not().isEmpty(),
    body("aptName", "Apartment name cannot be empty").trim().not().isEmpty(),
    body("zip", "Zipcode cannot be empty").trim().not().isEmpty(),
  ],
  userController.postAddress
);

expressRouter.get("/user", userController.getLoggedInUser);

expressRouter.post("/order", auth.verifyUser, userController.postOrder);

expressRouter.get("/orders", userController.getOrders);

expressRouter.post("/order-status/:orderId", userController.postOrderStatus);

expressRouter.get("/clients/connected", userController.getConnectedClients);

expressRouter.get(
  "/restaurants-location/:lat/:lng",
  userController.getRestaurantsByAddress
);

expressRouter.put(
    "/edit-profile",
    userController.editUserProfile
);

module.exports = expressRouter;
