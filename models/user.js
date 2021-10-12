import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const user = new Schema({
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
  }
});

mongoose.models = {};

const User = mongoose.model('users', user);

export default User;
