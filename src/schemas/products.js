import mongoose from "mongoose"

const products = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  description: {
    type: String,
    require: true
  },
  price: {
    type: Number,
    require: true
  },
  amount: {
    type: Number,
    require: true
  }
})

export default products