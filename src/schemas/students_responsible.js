import mongoose from "mongoose"

const students_responsibles = new mongoose.Schema({
  student_id: {
    type: mongoose.Types.ObjectId,
    require: true
  },
  responsible_id: {
    type: mongoose.Types.ObjectId,
    require: true
  }
})

export default students_responsibles