import mongoose from "mongoose"

import LevelsSchema from "../schemas/levels.js"

const levels = mongoose.model("levels", LevelsSchema)

class LevelsModel {
    async create(data) {
      try {
        const level = await levels(data.level).save()
      } catch (error) {
        console.log(`Failed to create a level: ${error}`)
      }
    }

    async findAll() {
        try {
            return await levels.find()
        } catch (error) {
            console.log(`Failed to fetch all levels: ${error}`)
        }
    }

    async findById(id) {
        try {
            return await levels.findById(id)
        } catch (error) {
            return undefined
        }
    }

    async findAllBySeason(id) {
        try {
            return await levels.find({ season_id: id })
        } catch(error) {
            return undefined
        }
    }

    async findLast() {
        try {
            return await levels.findOne().sort({ field: "asc", _id: -1 })
        } catch(error) {
            return undefined
        }
    }

    async update(id, data) {
        try {
            return await levels.findByIdAndUpdate(id, data)
        } catch (error) {
            return undefined
        }
    }

    async delete(id) {
        try {
            return await levels.findByIdAndDelete(id)
        } catch (error) {
            return undefined
        }
    }
}
  
export default new LevelsModel