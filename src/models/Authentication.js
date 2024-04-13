import mongoose from "mongoose"

import StudentsSchema from "../schemas/students.js"
import ResponsiblesSchema from "../schemas/responsibles.js"
import StudentsResponsiblesSchema from "../schemas/students_responsible.js"

const students = mongoose.model("students", StudentsSchema)
const responsibles = mongoose.model("responsibles", ResponsiblesSchema)
const students_responsibles = mongoose.model("students_responsibles", StudentsResponsiblesSchema)

class AuthenticationModel {
    async signup(data, responsibleExists) {
      try {
        const student = await new students(data.student).save()

        if(responsibleExists === "true") {
          return await new students_responsibles({ 
            student_id: student._id,
            responsible_id: data.responsible._id
          }).save()
        }

        const responsible = await new responsibles(data.responsible).save()
      
        await new students_responsibles({ 
          student_id: student._id,
          responsible_id: responsible._id
        }).save()
      } catch (error) {
        console.log(`Failed to register student: ${error}`)
      }
    }
}
  
export default new AuthenticationModel