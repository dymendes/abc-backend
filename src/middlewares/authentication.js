import dotenv from "dotenv"
import jwt from "jsonwebtoken"

dotenv.config()

export const authentication = async (req, res, next) => {
    try {
        const bearer = req.headers["authorization"]

        if(!bearer) return res.status(401).json({ message: "Invalid token." })
    
        const token = bearer.replace("Bearer ", "")
    
        try {
            req.session = await jwt.verify(token, process.env.JWT_SECRET)
        } catch (error) {
            return res.status(401).json({ message: "Invalid token." })   
        }

        next()
    } catch(error) {
        console.log(`There was an error checking the token: ${error}`)
    }
}