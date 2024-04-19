import LevelsModel from "../models/Levels.js"
import SeasonsModel from "../models/Seasons.js"

import ValidateController from "./Validate.js"

class LevelController {
    async create(req, res) {
        const { title, description, difficulty, minigame, reward, season_id } = req.body

        if(!(ValidateController.name(title)) ||  !(ValidateController.name(description)) || !(ValidateController.number(difficulty)) || !(ValidateController.name(minigame)) || !(ValidateController.number(reward))) {
            return res.status(400).json({ message: "Invalid level data!" })
        }

        const season = await SeasonsModel.findById(season_id)

        if(season === undefined) return res.status(400).json({ message: "This season doesn't exist!" })

        await LevelsModel.create({ 
            level: {
                title, 
                description, 
                difficulty, 
                minigame, 
                reward,
                season_id: season_id
            }
        })

        res.status(200).json({ message: "Level created successfully!" })
    }

    async findAll(req, res) {
        const levels = await LevelsModel.findAll()

        res.status(200).json({ levels, message: "All levels searched successfully!" })
    }

    async findById(req, res) {
        const { id } = req.params

        const level = await LevelsModel.findById(id)

        if(level === undefined) return res.status(400).json({ message: "This level doesn't exist!" })

        res.status(200).json({ level, message: "Level successfully searched for ID!" })
    }

    async update(req, res) {
        const { id } = req.params

        const { title, description, difficulty, minigame, reward } = req.body

        if(!(ValidateController.name(title)) ||  !(ValidateController.name(description)) || !(ValidateController.number(difficulty)) || !(ValidateController.name(minigame)) || !(ValidateController.number(reward))) {
            return res.status(400).json({ message: "Invalid level data!" })
        }

        const level = await LevelsModel.update(id, { title, description, difficulty, minigame, reward })
        
        if(level === undefined) return res.status(400).json({ message: "This level doesn't exist!" })

        res.status(200).json({ level, message: "Level updated successfully!" })
    }

    async delete(req, res) {
        const { id } = req.params

        const level = await LevelsModel.delete(id)

        if(level === undefined) return res.status(400).json({ message: "This level doesn't exist!" })

        res.status(200).json({ message: "Level deleted successfully!" })
    }
}

export default new LevelController