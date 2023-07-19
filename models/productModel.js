const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    id: {
      type: Number,
      required: [true, "Enter Id"],
    },
    name: {
      type: String,
      required: [true, "Enter Product Name"],
    },
    price: {
      type: Number,
      required: [true, "Enter Price"],
      default: 0,
    },
    photo: {
      type: String,
      required: [false, "Enter Image"],
    },
    description: {
      type: String,
      required: [false, "Enter Description"],
    },
    category: {
      type: String,
      required: [false, "Enter Category"],
    },
    rating: {
      type: Number,
      required: [false, "Enter Rating"],
    },
    countInStock: {
      type: Number,
      required: [false, "Enter Stock"],
    },
    numofReviews: {
      type: Number,
      required: [false, "Enter Reviews"],
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
