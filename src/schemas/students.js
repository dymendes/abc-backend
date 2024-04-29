import mongoose from "mongoose"

const students = new mongoose.Schema({
  firstName: {
    type: String,
    require: true
  },
  lastName: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  age: {
    type: Number,
    require: true
  },
  registration: {
    type: Date,
    default: Date.now(),
    require: true
  },
  coins: {
    type: Number,
    default: 0,
    require: true
  },
  last_level: {
    type: Number,
    default: 0,
    require: true
  },
  products: [
    { _id: mongoose.Types.ObjectId }
  ],
  responsible_id: {
    type: mongoose.Types.ObjectId,
    require: true
  }
})

export default students