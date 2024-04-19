import ResponsiblesModel from "../models/Responsibles.js"
import StudentsModel from "../models/Students.js"

class AuthenticationModel {
    async signup(data, responsibleExists) {
      try {
        if(responsibleExists === "true") {
          return await StudentsModel.create(data.student)
        }

        const responsible = await ResponsiblesModel.create(data.responsible)

        data.student.responsible_id = responsible._id

        return await StudentsModel.create(data.student)
      } catch (error) {
        console.log(`Failed to register student: ${error}`)
      }
    }
}
  
export default new AuthenticationModel