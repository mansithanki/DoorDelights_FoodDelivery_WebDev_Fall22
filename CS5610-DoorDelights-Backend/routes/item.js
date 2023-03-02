const express = require("express");
const { body } = require("express-validator");

const itemController = require("../controllers/itemController");
const auth = require("../middleware/auth");

const expressRouter = express.Router();

expressRouter.post(
  "/create-item",
  auth.verifySeller,
  [
    body("title", "Enter a title greater than 4 characters")
      .trim()
      .isLength({ min: 4 }),
      
    body("description", "Description cannot be empty").trim()
    .not()
    .isEmpty(),

    body("price", "Price cannot be empty").trim()
    .not()
    .isEmpty(),
  ],
  itemController.createItem
);

expressRouter.delete(
  "/delete-item/:itemId",
  auth.verifySeller,
  itemController.deleteItem
);

expressRouter.put(
  "/edit-item/:itemId",
  auth.verifySeller,
  [
    body("title", "Title needs to be at least 4 characters long!")
      .trim()
      .isLength({ min: 4 }),
    body("description", "Description is empty! Please enter a description").trim()
    .not()
    .isEmpty(),

    body("price", "Price Field is empty!")
    .trim()
    .not()
    .isEmpty(),
  ],
  itemController.editItem
);

expressRouter.get("/get-items", auth.verifySeller, itemController.getItems);

expressRouter.get("/get-item/:itemId", auth.verifySeller, itemController.getItem);

module.exports = expressRouter;
