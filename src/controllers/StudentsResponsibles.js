import StudentsResponsiblesModel from "../models/StudentsResponsibles.js"
import Students from "../models/Students.js"

class StudentsResponsiblesController {
    async findStudentsByResponsible(req, res) {
        const { id } = req.params

        const students = []

        const relationships = await StudentsResponsiblesModel.findStudentsByResponsible(id)

        relationships.forEach(async relationship => {
            const student = await Students.findById(relationship.student_id)

            students.push(student)
        })

        res.status(200).json({ students, message: "Users searched based on a responsible person successfully!" })
    }
}

export default new StudentsResponsiblesController