import SeasonModel from "../models/Seasons.js"

import { validate } from "./validate.js"

class SeasonController {
    async create(req, res) {
        const { title, description, theme } = req.body

        if(!(validate.name(title)) ||  !(validate.name(description)) || !(validate.name(theme))) {
            return res.status(400).json({ message: "Invalid season data!" })
        }

        await SeasonModel.create({ title, description, theme })

        res.status(200).json({ message: "Season created successfully!" })
    }

    async findAll(req, res) {
        const seasons = await SeasonModel.findAll()

        res.status(200).json({ seasons, message: "All seasons searched successfully!" })
    }
}

export default new SeasonController