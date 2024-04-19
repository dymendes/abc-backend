import mongoose from "mongoose"

import StudentsResponsiblesSchema from "../schemas/studentsResponsible.js"

const studentsResponsibles = mongoose.model("students_responsibles", StudentsResponsiblesSchema)

class StudentsResponsiblesModel {
    async create(student_id, responsible_id) {
      try {
        await new studentsResponsibles({ student_id, responsible_id }).save()
      } catch (error) {
        console.log(`Failure to create a relationship between student and responsible: ${error}`)
      }
    }

    async findRelationshipsOfStudentsByResponsible(responsible_id) {
        try {
            return await studentsResponsibles.find({ responsible_id })
        } catch (error) {
            return undefined
        }
    }

    async findRelationshipsOfResponsibleByStudent(student_id) {
      try {
          return await studentsResponsibles.find({ student_id })
      } catch (error) {
          return undefined
      }
  }
}
  
export default new StudentsResponsiblesModel