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
  // productTotalPrice: {
  //   type: Number,
  //   required: false,
  //   default: 0,
  // },
  amounPerQty: {
    type: String,
    required: true,
    default: "",
  },
  // orderQuantity: {
  //   type: Number,
  //   required: false,
  //   default: 0,
  // },
  productDetail: {
    type: String,
    required: false,
    default: "",
  },
  nutritions: {
    type: String,
    required: false,
    default: "",
  },
  rating: {
    type: Number,
    required: false,
    default: "",
  },
  productImage: {
    type: String,
    required: false,
    default: ""
  },
  totalSalesOrderNumber: {
    type: Number,
    required: true,
    default: 0
  },
  likedBy: {
    type: [{ type: Schema.Types.ObjectId, ref: 'users' }]
  },
  addedToCartBy : {
    type: [{ type: Schema.Types.ObjectId, ref: 'users' }]
  },
  orders : {
    type: [{ type: Schema.Types.ObjectId, ref: 'users' }]
  },
});



mongoose.models = {};

const Product = mongoose.model("products", product);

export default Product;
