const mongoose = require("mongoose");
require("mongoose-currency").loadType(mongoose);
const Currency = mongoose.Types.Currency;

const { Schema } = mongoose;

const mealSchema = new Schema(
  {
    meal: {
      type: String,
      required: true,
    },
    price: {
      type: Currency,
      required: true,
      min: 0,
    },
    available: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: false,
  }
);

const Meal = mongoose.model("meal", mealSchema);

module.exports = Meal;
