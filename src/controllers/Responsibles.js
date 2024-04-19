import Responsibles from "../models/Responsibles.js"

class ResponsibleController {
    async findAll(req, res) {
        const responsibles = await Responsibles.findAll() 

        res.status(200).json({ responsibles, message: "All those responsible successfully searched!" })
    }
}

export default new ResponsibleController