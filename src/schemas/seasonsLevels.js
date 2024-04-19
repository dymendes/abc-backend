import mongoose from "mongoose"

const seasonsLevels = new mongoose.Schema({
  season_id: {
    type: mongoose.Types.ObjectId,
    require: true
  },
  level_id: {
    type: mongoose.Types.ObjectId,
    require: true
  }
})

export default seasonsLevels