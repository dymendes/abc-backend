import mongoose from "mongoose"

const levels = new mongoose.Schema({
  title: {
    type: String,
    require: true
  },
  description: {
    type: String,
    require: true
  },
  difficulty: {
    type: Number,
    require: true
  },
  minigame: {
    type: String,
    require: true
  },
  reward: {
    type: Number,
    require: true
  }
})

export default levels