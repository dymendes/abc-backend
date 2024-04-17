import mongoose from "mongoose"

import SeasonsSchema from "../schemas/seasons.js"

const seasons = mongoose.model("seasons", SeasonsSchema)

class SeasonsModel {
    async create(data) {
      try {
        await seasons(data).save()
      } catch (error) {
        console.log(`Failed to create a season: ${error}`)
      }
    }

    async findAll() {
        try {
            return await seasons.find()
        } catch (error) {
            console.log(`Failed to fetch all seasons: ${error}`)
        }
    }

    async findById(id) {
        try {
            return await seasons.findById(id)
        } catch (error) {
            return undefined
        }
    }
}
  
export default new SeasonsModel