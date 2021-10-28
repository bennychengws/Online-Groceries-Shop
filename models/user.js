import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const user = new Schema({
  // _id: {
  //   type: Schema.Types.ObjectId,
  // },
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  address: {
    type: Object,
  },
  favourite: {
    type: [{ type: Schema.Types.ObjectId, ref: 'products' }],
  },
  cart: {
    type: [{ _id: {type: Schema.Types.ObjectId, ref: 'products' }, quantity: {type: Number}}],
  }
});

mongoose.models = {};

const User = mongoose.model('users', user);

export default User;
