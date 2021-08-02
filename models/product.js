import mongoose from "mongoose";
const Schema = mongoose.Schema;

const product = new Schema({
  name: {
    type: String,
    required: true,
    default: "",
  },
  category: {
    type: String,
    required: true,
    default: "",
  },
  brand: {
    type: String,
    required: true,
    default: "",
  },
  price: {
    type: Number,
    required: true,
    default: 0,
  },
  amount: {
    type: String,
    required: true,
    default: "",
  },
  orderQuantity: {
    type: Number,
    required: true,
    default: 0,
  },
  productDetail: {
    type: String,
    required: true,
    default: "",
  },
  nutritions: {
    type: String,
    required: true,
    default: "",
  },
  review: {
    type: String,
    required: true,
    default: "",
  },
});



mongoose.models = {};

const Product = mongoose.model("products", product);

export default Product;
