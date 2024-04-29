import mongoose from "mongoose"

import ProductsSchema from "../schemas/products.js"
import StudentsSchema from "../schemas/students.js"

const products = mongoose.model("products", ProductsSchema)
const students = mongoose.model("students", StudentsSchema)

class ProductsModel {
    async create(data) {
      try {
        await products(data).save()
      } catch (error) {
        console.log(`Failed to create a product: ${error}`)
      }
    }

    async findAll() {
        try {
            return await products.find()
        } catch (error) {
            console.log(`Failed to fetch all products: ${error}`)
        }
    }

    async findById(id) {
        try {
            return await products.findById(id)
        } catch (error) {
            return undefined
        }
    }

    async update(id, data) {
        try {
            return await products.findByIdAndUpdate(id, data)
        } catch (error) {
            return undefined
        }
    }

    async buy(id, data) {
        try {
            return await students.findByIdAndUpdate(id, { $push: data })
        } catch (error) {
            return undefined
        }
    }

    async delete(id) {
        try {
            return await products.findByIdAndDelete(id)
        } catch (error) {
            return undefined
        }
    }
}
  
export default new ProductsModel