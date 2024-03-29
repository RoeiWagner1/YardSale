const fs = require('fs');

const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

const HttpError = require('../models/http-error');
const getCoordsForAddress = require('../util/location');
const Item = require("../models/item");
const User = require('../models/user');

const getItemById = async (req, res, next) => {
  const itemId = req.params.tid;

  let item;
  try {
    item = await Item.findById(itemId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, Could not find an item.',
      500
    );
    return next(error);
  }

  if (!item) {
    const error = new HttpError(
      'Could not find item for the provided id.',
      404
    );
    return next(error);
  }

  res.json({ item: item.toObject({ getters: true }) });
};

const getItemsByUserId = async (req, res, next) => {
  const userId = req.params.uid;

  let userWithItems;
  try {
    userWithItems = await User.findById(userId).populate('items');
  } catch (err) {
    const error = new HttpError(
      'Fetching items failed, please try again later.',
      500
    );
    return next(error);
  }

  if (!userWithItems || userWithItems.items.length === 0) {
    return next(
      new HttpError('Could not find items for the provided user.', 404)
    );
  }

  res.json({ items: userWithItems.items.map(item => item.toObject({ getters: true })) });
};

const createItem = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  const { title, address, price, description, mobile } = req.body;

  let coordinates;
  try {
    coordinates = await getCoordsForAddress(address);
  } catch (error) {
    return next(error);
  }

  const createdItem = new Item({
    title,
    address,
    price,
    description,
    location: coordinates,
    image: req.file.path,
    mobile,
    creator: req.userData.userId,
  });

  let user;
  try {
    user = await User.findById(req.userData.userId);
  } catch (err) {
    const error = new HttpError(
      'Creating item failed, please try again.',
      500
    );
    return next(error);
  }

  if (!user) {
    const error = new HttpError('Could not find user for the provided id.', 404);
    return next(error);
  }

  console.log(user);

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdItem.save({ session: sess }); 
    user.items.push(createdItem); 
    await user.save({ session: sess }); 
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      'Creating item failed, please try again.',
      500
    );
    return next(error);
  }

  res.status(201).json({ item: createdItem });
};

const updateItem = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  const { title, description, address, price, mobile } = req.body;
  const itemId = req.params.tid;

  let item;
  try {
    item = await Item.findById(itemId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update item.',
      500
    );
    return next(error);
  }

  if (item.creator.toString() !== req.userData.userId) {
    const error = new HttpError(
      'You are not allowed to edit this item.',
      401
    );
    return next(error);
  }

  item.title = title;
  item.description = description;
  item.address = address;
  item.price = price;
  item.mobile = mobile;

  try {
    item.location = await getCoordsForAddress(address);
  } catch (error) {
    return next(error);
  }

  try {
    await item.save();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update item.',
      500
    );
    return next(error);
  }

  res.status(200).json({ item: item.toObject({ getters: true }) });
};

const deleteItem = async (req, res, next) => {
  const itemId = req.params.tid;

  let item;
  try {
    item = await Item.findById(itemId).populate("creator");
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete item.',
      500
    );
    return next(error);
  }

  if (!item) {
    const error = new HttpError('Could not find an item for this id.', 404);
    return next(error);
  }

  if (item.creator.id !== req.userData.userId) {
    const error = new HttpError(
      'You are not allowed to delete this item.',
      401
    );
    return next(error);
  }

  const imagePath = item.image;

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await item.remove({session: sess});
    item.creator.items.pull(item);
    await item.creator.save({session: sess});
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete item.',
      500
    );
    return next(error);
  }

  fs.unlink(imagePath, err => {
    console.log(err);
  });
  
  res.status(200).json({ message: 'Deleted item.' });
};

exports.getItemById = getItemById;
exports.getItemsByUserId = getItemsByUserId;
exports.createItem = createItem;
exports.updateItem = updateItem;
exports.deleteItem = deleteItem;
