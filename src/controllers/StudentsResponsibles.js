import StudentsResponsiblesModel from "../models/StudentsResponsibles.js"
import Students from "../models/Students.js"
import Responsibles from "../models/Responsibles.js"

class StudentsResponsiblesController {
    async findStudentsByResponsible(req, res) {
        const { id } = req.params
 
        const relationships = await StudentsResponsiblesModel.findRelationshipsOfStudentsByResponsible(id)

        if(relationships === undefined || !relationships.length) return res.status(400).json({ message: "This responsible does not exist!" })

        const studentsSearch = async () => {
            const students = []

            for(const relationship of relationships) {
                const student = await Students.findById(relationship.student_id)

                students.push(student)
            }

            return students
        }

        const students = await studentsSearch()

        res.status(200).json({ students, message: "Students searched based on a responsible person successfully!" })
    }

    async findResponsibleByStudent(req, res) {
        const { id } = req.params
 
        const relationships = await StudentsResponsiblesModel.findRelationshipsOfResponsibleByStudent(id)

        if(relationships === undefined || !relationships.length) return res.status(400).json({ message: "This student does not exist!" })

        const responsibleSearch = async () => {
            let responsible 

            for(const relationship of relationships) {
                responsible = await Responsibles.findById(relationship.responsible_id)
            }

            return responsible
        }

        const responsible = await responsibleSearch()

        res.status(200).json({ responsible, message: "Responsible researched based on a student successfully!" })
    }
}

export default new StudentsResponsiblesController