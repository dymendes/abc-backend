import mongoose from "mongoose"

import ResponsiblesSchema from "../schemas/responsibles.js"

const responsibles = mongoose.model("responsibles", ResponsiblesSchema)

class ResponsiblesModel {
    async findAll() {
      try {
        return await responsibles.find()
      } catch (error) {
        console.log(`Failure to search for all those responsible: ${error}`)
      }
    }

    async findById(id) {
      try {
        return await responsibles.findById(id)
      } catch (error) {
        console.log(`Failed to search for responsible person by ID: ${error}`)
      }
    }

    async findByEmail(email) {
      try {
        return await responsibles.findOne({ email })
      } catch (error) {
        console.log(`Failed to search for responsible person by email: ${error}`)
      }
    }
}
  
export default new ResponsiblesModel