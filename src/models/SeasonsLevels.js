import mongoose from "mongoose"

import seasonsLevelsSchema from "../schemas/seasonsLevels.js"

const seasonsLevels = mongoose.model("seasons_levels", seasonsLevelsSchema)

class seasonsLevelsModel {
    async create(season_id, level_id) {
      try {
        await new seasonsLevels({ season_id, level_id }).save()
      } catch (error) {
        console.log(`Failed to create a relationship between season and level: ${error}`)
      }
    }
}
  
export default new seasonsLevelsModel