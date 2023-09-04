const express = require('express');
const { check } = require('express-validator');

const itemsControllers = require('../controllers/items-controllers');
const fileUpload = require('../middleware/file-upload');

const router = express.Router();

router.get("/:tid", itemsControllers.getItemById);

router.get('/user/:uid', itemsControllers.getItemsByUserId);

router.post(
  '/',
  fileUpload.single('image'),
  [
    check('title').not().isEmpty(),
    check('address').not().isEmpty(),
    check('price').not().isEmpty(),
    check('description').isLength({ min: 5 }),
    check('mobile').isLength({ min: 10 }),
  ],
  itemsControllers.createItem
);

router.patch(
  "/:tid",
  [
    check('title').not().isEmpty(),
    check('address').not().isEmpty(),
    check('price').not().isEmpty(),
    check('description').isLength({ min: 5 }),
    check('mobile').isLength({ min: 10 }),
  ],
  itemsControllers.updateItem
);

router.delete("/:tid", itemsControllers.deleteItem);

module.exports = router;
