import StudentsResponsiblesModel from "../models/StudentsResponsibles.js"
import Students from "../models/Students.js"

class StudentsResponsiblesController {
    async findStudentsByResponsible(req, res) {
        const { id } = req.params

        const relationships = await StudentsResponsiblesModel.findStudentsByResponsible(id)

        const studentsSearch = async () => {
            const students = []

            for(const relationship of relationships) {
                const student = await Students.findById(relationship.student_id)

                students.push(student)
            }

            return students
        }

        const students = await studentsSearch()

        res.status(200).json({ students, message: "Users searched based on a responsible person successfully!" })
    }
}

export default new StudentsResponsiblesController