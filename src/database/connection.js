import mongoose from "mongoose"

export const connection = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_HOST)
        console.log("Connected to the database!")
    } catch (error) {
        console.log("Failed to connect to database!")
    }
}