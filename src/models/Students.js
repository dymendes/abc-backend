import mongoose from "mongoose"

import StudentsSchema from "../schemas/students.js"

const students = mongoose.model("students", StudentsSchema)

class StudentsModel {
  async create(data) {
    try {
      return await students(data).save()
    } catch (error) {
      console.log(`Failed to create a student: ${error}`)
    }
  }

  async findById(id) {
    try {
      return await students.findById(id)
    } catch (error) {
      console.log(`Failed to search for student by ID: ${error}`)
    }
  }

    async findByEmail(email) {
      try {
        return await students.findOne({ email })
      } catch (error) {
        console.log(`Failed to search for student person by email: ${error}`)
      }
    }
}
  
export default new StudentsModel