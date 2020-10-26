const bodyParser = require("body-parser");
const express = require("express");
const Meal = require("../models/meal.model");
const authenticate = require('../authenticate')

const router = express.Router();
router.use(bodyParser.json());

router
  .route("/")
  .get((req, res, next) => {
    Meal.find({})
      .then(
        (meals) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json({
            message: "Meals",
            data: meals
          });
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .post(authenticate.isUser, authenticate.varifyAdmin, (req, res) => {
    Meal.create(req.body).then((meal) => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json({
        message: "Meal Added",
        data: meal
      });
    });
  })
  .put(authenticate.isUser, authenticate.varifyAdmin, (req, res) => {
    res.statusCode = 403; // operation not supported
    res.end("PUT operation not supported on /meals");
  })
  .delete(authenticate.isUser, authenticate.varifyAdmin, (req, res, next) => {
    Meal.deleteMany({})
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

module.exports = router;
