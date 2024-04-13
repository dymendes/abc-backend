import bcrypt from "bcrypt"

import AuthenticationModel from "../models/Authentication.js"
import ResponsiblesModel from "../models/Responsibles.js"
import StudentsModel from "../models/Students.js"

import { validate } from "./UserDataValidate.js"

class StudentsController {
  async signup(req, res) {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(req.body.studentPassword, salt)

    const student = {
      firstName: req.body.studentFirstName,
      lastName: req.body.studentLastName,
      email: req.body.studentEmail,
      password: hash,
      age: req.body.studentAge
    }

    const responsible = {
      firstName: req.body.responsibleFirstName,
      lastName: req.body.responsibleLastName,
      email: req.body.responsibleEmail,
      age: req.body.responsibleAge
    }

    const responsibleExistsCheck = req.body.responsibleExistsCheck

    const responsibleFindByEmail = await ResponsiblesModel.findByEmail(req.body.responsibleEmail)
    
    const studentFindByEmail = await StudentsModel.findByEmail(req.body.studentEmail)

    if(!(validate.name(req.body.studentFirstName)) || !(validate.name(req.body.studentLastName)) || !(validate.email(req.body.studentEmail)) || !(validate.password(req.body.studentPassword)) || !(validate.age(req.body.studentAge))) {
      return res.status(400).json({ message: "Student data is invalid!" })
    }

    if(!(validate.name(req.body.responsibleFirstName)) || !(validate.name(req.body.responsibleLastName)) || !(validate.email(req.body.responsibleEmail)) || !(validate.age(req.body.responsibleAge)) || responsibleExistsCheck === undefined) {
      return res.status(400).json({ message: "Responsible data is invalid!" })
    }

    if(studentFindByEmail !== null) return res.status(400).json({ message: "There is already a student with this email!" })

    if(responsibleExistsCheck === "true") {
      if(responsibleFindByEmail === null) {
        return res.status(400).json({ message: "This person is not registered!" })
      } else {
        await AuthenticationModel.signup({ student, responsible: responsibleFindByEmail }, responsibleExistsCheck )
      }
    } else {
      if(responsibleFindByEmail === null) {
        await AuthenticationModel.signup({ student, responsible }, responsibleExistsCheck )
      } else {
        return res.status(400).json({ message: "This person is already registered!" })
      }
    }

    return res.status(200).json({ message: "User registered successfully!" })
  }
}

export default new StudentsController