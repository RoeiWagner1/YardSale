const express = require("express");
const { check } = require('express-validator');

const itemsConstrollers = require('../controllers/items-contorllers');

const router = express.Router();

router.get("/:tid", itemsConstrollers.getItemById);

router.get("/user/:uid", itemsConstrollers.getItemsByUserId);

router.post(
  '/',
  [
    check("title").not().isEmpty(),
    check("description").isLength({ min: 5 }),
    check("address").not().isEmpty(),
    check("price").not().isEmpty(),
    check("mobile").isLength({ min: 10 }),
  ],
  itemsConstrollers.createItem
);

router.patch(
  "/:tid",
  [
    check("title").not().isEmpty(),
    check("description").isLength({ min: 5 }),
    check("address").not().isEmpty(),
    check("price").not().isEmpty(),
    check("mobile").isLength({ min: 10 }),
  ],
  itemsConstrollers.updateItem
);

router.delete("/:tid", itemsConstrollers.deleteItem);

module.exports = router;