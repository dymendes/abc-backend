import mongoose from "mongoose"

const responsibles = new mongoose.Schema({
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
  age: {
    type: Number,
    require: true
  },
  registration: {
    type: Date,
    default: Date.now(),
    require: true
  }
})

export default responsibles