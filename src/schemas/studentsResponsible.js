import mongoose from "mongoose"

const studentsResponsibles = new mongoose.Schema({
  student_id: {
    type: mongoose.Types.ObjectId,
    require: true
  },
  responsible_id: {
    type: mongoose.Types.ObjectId,
    require: true
  }
})

export default studentsResponsibles