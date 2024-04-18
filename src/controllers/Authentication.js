import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import AuthenticationModel from "../models/Authentication.js"
import ResponsiblesModel from "../models/Responsibles.js"
import StudentsModel from "../models/Students.js"

import Validate from "./Validate.js"

class AuthenticationController {
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

    if(!(Validate.name(req.body.studentFirstName)) || !(Validate.name(req.body.studentLastName)) || !(Validate.email(req.body.studentEmail)) || !(Validate.password(req.body.studentPassword)) || !(Validate.age(req.body.studentAge))) {
      return res.status(400).json({ message: "Student data is invalid!" })
    }

    if(!(Validate.name(req.body.responsibleFirstName)) || !(Validate.name(req.body.responsibleLastName)) || !(Validate.email(req.body.responsibleEmail)) || !(Validate.age(req.body.responsibleAge)) || responsibleExistsCheck === undefined) {
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

  async signin(req, res) {
    const { studentEmail, studentPassword } = req.body

    const studentFindByEmail = await StudentsModel.findByEmail(studentEmail)

    if(studentFindByEmail === null) return res.status(403).json({ message: "There is already a student with this email!" })

    const studentPasswordCompare = await bcrypt.compare(studentPassword, studentFindByEmail.password)

    if(!studentPasswordCompare) return res.status(403).json({ message: "Incorrect password!" })

    const token = jwt.sign({ 
      id: studentFindByEmail._id,
      firstName: studentFindByEmail.firstName,
      lastName: studentFindByEmail.lastName,
      email: studentFindByEmail.email,
      age: studentFindByEmail.age,
      registration: studentFindByEmail.registration
    }, process.env.JWT_SECRET, { expiresIn: "24h" })

    return res.status(200).json({ token, message: "User successfully authenticated!" })
  }
}

export default new AuthenticationController