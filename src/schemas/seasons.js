import mongoose from "mongoose"

const seasons = new mongoose.Schema({
  title: {
    type: String,
    require: true
  },
  description: {
    type: String,
    require: true
  },
  theme: {
    type: String,
    require: true
  }
})

export default seasons