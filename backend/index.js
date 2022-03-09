const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { body } = require("express-validator");
const { validationResult } = require("express-validator");
const Kid = require("./model/kids");

const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());

app.post(
  "/register",
  [
    body("parentEmail").isEmail(),
    body("firstName").not().isEmpty(),
    body("lastName").not().isEmpty(),
    body("age").not().isEmpty(),
    body("state").not().isEmpty(),
    body("gender").not().isEmpty(),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    const { firstName, lastName, parentEmail, state, age, gender, churchName } =
      req.body;

    if (!errors.isEmpty()) {
      console.log(errors);
      const error = new Error("Validation failed, All Fields Are Required");
      error.statusCode = 422;
      throw error;
    }

    if (age > 7) {
      const error = new Error("Your age is greater than the specified Age");
      error.code = 422;
      throw error;
    }
    const kid = new Kid({
      name: `${firstName} ${lastName}`,
      parentEmail,
      state,
      age,
      gender,
      churchName,
    });
    kid
      .save()
      .then((data) => {
        res.status(200).json({
          message: "User has succesfully registered",
        });
      })
      .catch((error) => {
        if (!error.statusCode) {
          error.statusCode = 500;
        }
        if (error.name === "MongoServerError" && error.code === 11000) {
          error.message = "Your email or Name Is Taken by Another User.";
        }
        next(error);
      });
  }
);

Kid.find().then((data) => console.log(data));

function errorHandler(error, request, response, next) {
  return response.status(error.statusCode || 500).json({
    error: {
      message: error.message || "Couldn't complete Request Please Try Again",
    },
  });
}

app.use(errorHandler);
mongoose
  .connect("mongodb://localhost/9jakids")
  .then(console.log("DATABASE CONNECTED"))
  .then(
    app.listen(PORT, () => {
      console.log("SERVER IS RUNNINGs");
    })
  )
  .catch((error) => console.log(error));
