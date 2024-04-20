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

  async findAll() {
    try {
      return await students.find()
    } catch (error) {
      console.log(`Failure to search for all those students: ${error}`)
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

    async update(id, data) {
      try {
          return await students.findByIdAndUpdate(id, data)
      } catch (error) {
          return undefined
      }
    }

    async delete(id) {
        try {
            return await students.findByIdAndDelete(id)
        } catch (error) {
            return undefined
        }
    }
}
  
export default new StudentsModel