import mongoose from "mongoose";
const Schema = mongoose.Schema;

const user = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: Object,
  },
  favourite: {
    type: [{ type: Schema.Types.ObjectId, ref: "products" }],
  },
  cart: {
    type: [
      {
        _id: { type: Schema.Types.ObjectId, ref: "products" },
        quantity: { type: Number },
      },
    ],
  },
  orders: {
    type: [
      {
        _orderId: {type: Schema.Types.ObjectId},
        items: {
          type: [
            {
              _id: { type: Schema.Types.ObjectId, ref: "products", required: true },
              name: { type: String, required: true, default: "",},
              productImage: {type: String, required: false, default: ""},
              quantity: { type: Number, required: true },
              amounPerQty: {type: String, default: ""},
              discountedPrice: { type: Schema.Types.Decimal128, default: 0, required: true },
              productTotalPrice: { type: Schema.Types.Decimal128, default: 0, required: true },
            }
          ]
        },
        totalPrice: { type: Schema.Types.Decimal128, default: 0, required: true },
        status: { type: String, default: "Pending to deliver" },
        orderTime: { type: Date, required: true },
        shipTo: { type: Object, default: ""  },
        expectedArrivalDate: {type: Date},
        actualArrivalDate: {type: Date},
        orderedBy : {type: Schema.Types.ObjectId}
      },
    ],
  },
});

mongoose.models = {};

const User = mongoose.model("users", user);

export default User;
