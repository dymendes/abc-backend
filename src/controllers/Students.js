import bcrypt from "bcrypt"

import StudentsModel from "../models/Students.js"
import ValidateController from "./Validate.js"

class StudentController {
    async findAll(req, res) {
        const students = await StudentsModel.findAll() 

        res.status(200).json({ students, message: "All students searched successfully!" })
    }

    async findById(req, res) {
        const { id } = req.params

        const student = await StudentsModel.findById(id)

        if(student === undefined || student === null) return res.status(400).json({ message: "This student doesn't exist!" })

        res.status(200).json({ student, message: "Student successfully searched for ID!" })
    }

    async update(req, res) {
        const { id } = req.params

        const { firstName, lastName, email, password, age  } = req.body

        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

        if(!(ValidateController.name(firstName)) || !(ValidateController.name(lastName)) || !(ValidateController.email(email)) || !(ValidateController.password(password)) || !(ValidateController.age(age))) {
            return res.status(400).json({ message: "Student data is invalid!" })
          }

        const student = await StudentsModel.update(id, { firstName, lastName, email, password: hash, age })
        
        if(student === undefined) return res.status(400).json({ message: "This student doesn't exist!" })

        res.status(200).json({ student, message: "Student updated successfully!" })
    }

    async delete(req, res) {
        const { id } = req.params

        const student = await StudentsModel.delete(id)

        if(student === undefined) return res.status(400).json({ message: "This student doesn't exist!" })

        res.status(200).json({ message: "Student deleted successfully!" })
    }
}

export default new StudentController