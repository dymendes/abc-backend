import ResponsiblesModel from "../models/Responsibles.js"

import ValidateController from "./Validate.js"

class ResponsibleController {
    async findAll(req, res) {
        const responsibles = await ResponsiblesModel.findAll() 

        res.status(200).json({ responsibles, message: "All those responsible successfully searched!" })
    }

    async findById(req, res) {
        const { id } = req.params

        const responsible = await ResponsiblesModel.findById(id)

        if(responsible === undefined || responsible === null) return res.status(400).json({ message: "This responsible doesn't exist!" })

        res.status(200).json({ responsible, message: "Responsible successfully searched for ID!" })
    }

    async update(req, res) {
        const { id } = req.params

        const { firstName, lastName, email, age } = req.body

        if(!(ValidateController.name(firstName)) ||  !(ValidateController.name(lastName)) || !(ValidateController.email(email)) || !(ValidateController.number(age))) {
            return res.status(400).json({ message: "Invalid responsible data!" })
        }

        const responsible = await ResponsiblesModel.update(id, { firstName, lastName, email, age })
        
        if(responsible === undefined) return res.status(400).json({ message: "This responsible doesn't exist!" })

        res.status(200).json({ responsible, message: "Responsible updated successfully!" })
    }

    async delete(req, res) {
        const { id } = req.params

        const responsible = await ResponsiblesModel.delete(id)

        if(responsible === undefined) return res.status(400).json({ message: "This responsible doesn't exist!" })

        res.status(200).json({ message: "Responsible deleted successfully!" })
    }
}

export default new ResponsibleController