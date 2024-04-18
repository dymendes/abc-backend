import SeasonModel from "../models/Seasons.js"

import Validate from "./Validate.js"

class SeasonController {
    async create(req, res) {
        const { title, description, theme } = req.body

        if(!(Validate.name(title)) ||  !(Validate.name(description)) || !(Validate.name(theme))) {
            return res.status(400).json({ message: "Invalid season data!" })
        }

        await SeasonModel.create({ title, description, theme })

        res.status(200).json({ message: "Season created successfully!" })
    }

    async findAll(req, res) {
        const seasons = await SeasonModel.findAll()

        res.status(200).json({ seasons, message: "All seasons searched successfully!" })
    }

    async findById(req, res) {
        const { id } = req.params

        const season = await SeasonModel.findById(id)

        if(season === undefined) return res.status(400).json({ message: "This season doesn't exist!" })

        res.status(200).json({ season, message: "Season successfully searched for ID!" })
    }

    async update(req, res) {
        const { id } = req.params

        const { title, description, theme } = req.body

        if(!(Validate.name(title)) ||  !(Validate.name(description)) || !(Validate.name(theme))) {
            return res.status(400).json({ message: "Invalid season data!" })
        }

        const season = await SeasonModel.update(id, { title, description, theme})
        
        if(season === undefined) return res.status(400).json({ message: "This season doesn't exist!" })

        res.status(200).json({ season, message: "Season updated successfully!" })
    }

    async delete(req, res) {
        const { id } = req.params

        const season = await SeasonModel.delete(id)

        if(season === undefined) return res.status(400).json({ message: "This season doesn't exist!" })

        res.status(200).json({ message: "Season deleted successfully!" })

    }
}

export default new SeasonController