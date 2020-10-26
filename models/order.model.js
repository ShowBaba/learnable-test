const mongoose = require("mongoose");

const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    meal: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: false }
);

const Order = mongoose.model("order", orderSchema);

module.exports = Order;
