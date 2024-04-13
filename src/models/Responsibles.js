import mongoose from "mongoose"

import ResponsiblesSchema from "../schemas/responsibles.js"

const responsibles = mongoose.model("responsibles", ResponsiblesSchema)

class ResponsiblesModel {
    async findByEmail(email) {
      try {
        return await responsibles.findOne({ email })
      } catch (error) {
        console.log(`Failed to search for responsible person by email: ${error}`)
      }
    }
}
  
export default new ResponsiblesModel