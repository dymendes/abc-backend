class StudentController {
    profile(req, res) {
        res.status(200).json({ session: req.session })
    }
}

export default new StudentController