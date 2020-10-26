const bodyParser = require("body-parser");
const express = require("express");
const Order = require("../models/order.model");
const authenticate = require("../authenticate");

const router = express.Router();
router.use(bodyParser.json());

router
  .route("/")
  .get(authenticate.isUser, authenticate.varifyAdmin, (req, res, next) => {
    Order.find({})
      .then(
        (orders) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json({
            message: "Orders",
            data: orders,
          });
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .post((req, res, next) => {
    Order.create(req.body)
      .then(
        (order) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json({
            message: "Order Added",
            data: order,
          });
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .put(authenticate.isUser, authenticate.varifyAdmin, (req, res) => {
    res.statusCode = 403; // operation not supported
    res.end("PUT operation not supported on /orders");
  })
  .delete(authenticate.isUser, authenticate.varifyAdmin, (req, res, next) => {
    Order.deleteMany({})
      .then(
        (response) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(response);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  });

router
  .route("/:id")
  .get(authenticate.isUser, authenticate.varifyAdmin, (req, res, next) => {
    Order.findById(req.params.id)
      .then(
        (order) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json({
            message: "Order",
            data: order,
          });
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .post(authenticate.isUser, authenticate.varifyAdmin, (req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on current endpoint`);
  })
  .put(authenticate.isUser, authenticate.varifyAdmin, (req, res, next) => {
    Order.findByIdAndUpdate(req.params.id, { $set: req.id }, { new: true })
      .then(
        (order) => {
          res.statusCode = 200;
          res.json({
            message: "Order Updated",
            data: order,
          });
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .delete(authenticate.isUser, authenticate.varifyAdmin, (req, res, next) => {
    Order.findByIdAndRemove(req.params.id).then((response) => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(response);
    },
    (err) => next(err))
    .catch((err) => next(err));
  });

module.exports = router;
