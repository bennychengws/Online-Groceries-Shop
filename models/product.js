import mongoose from "mongoose";
const Schema = mongoose.Schema;

const product = new Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  volume: {
    type: String,
    required: false,
  },
  productDetail: {
    type: String,
    required: false,
  },
  nutritions: {
    type: String,
    required: false,
  },
  review: {
    type: String,
    required: false,
  },
});



mongoose.models = {};

const Product = mongoose.model("products", product);

export default Product;
