import ProductsModel from "../models/Products.js"
import StudentsModel from "../models/Students.js"

import ValidateController from "./Validate.js"

class ProductsController {
    async create(req, res) {
        const { name, description, price, amount } = req.body

        if(!(ValidateController.name(name)) ||  !(ValidateController.name(description)) || !(ValidateController.number(price)) || !(ValidateController.number(amount))) {
            return res.status(400).json({ message: "Invalid product data!" })
        }

        await ProductsModel.create({ name, description, price, amount })

        res.status(200).json({ message: "Product created successfully!" })
    }

    async findAll(req, res) {
        const products = await ProductsModel.findAll()

        res.status(200).json({ products, message: "All products searched successfully!" })
    }

    async findById(req, res) {
        const { id } = req.params

        const product = await ProductsModel.findById(id)

        if(product === undefined || product === null) return res.status(404).json({ message: "This product doesn't exist!" })

        res.status(200).json({ product, message: "Product successfully searched for ID!" })
    }

    async update(req, res) {
        const { id } = req.params

        const { name, description, price, amount } = req.body

        if(!(ValidateController.name(name)) ||  !(ValidateController.name(description)) || !(ValidateController.number(price)) || !(ValidateController.number(amount))) {
            return res.status(400).json({ message: "Invalid product data!" })
        }

        const product = await ProductsModel.update(id, { name, description, price, amount })
        
        if(product === undefined) return res.status(404).json({ message: "This product doesn't exist!" })

        res.status(200).json({ product, message: "Product updated successfully!" })
    }

    async buy(req, res) {
        const session = req.session

        const productId = req.params.id

        const product = await ProductsModel.findById(productId)

        if(product === undefined || product === null) return res.status(404).json({ message: "This product doesn't exist!" })

        if(product.amount <= 0) return res.status(410).json({ message: "This product is sold out!" })

        const student = await StudentsModel.findById(session.id)

        if(student === undefined || student === null) return res.status(404).json({ message: "This student doesn't exist!" })

        if(student.coins < product.price) return res.status(410).json({ message: "The student does not have enough coins" })

        let productAlreadyPurchased = null

        student.products.forEach(productId => {
            String(productId) === String(product._id) 
                ? productAlreadyPurchased = true : productAlreadyPurchased = false
        })

        if(productAlreadyPurchased === true) return res.status(403).json({ message: "This student has already purchased this product!" })

        const amountAfterPurchase = { amount: product.amount - 1 }
        const coinsAfterPurchase = student.coins - product.price
    
        const productAndStudent = await ProductsModel.buy(student._id, productId, { amountAfterPurchase, product: { products: productId }, coinsAfterPurchase })

        if(productAndStudent === undefined) return res.status(500).json({ message: "Failed to make purchase!" })

        res.status(200).json({ productAndStudent, message: "Product purchased successfully!" })
    }

    async delete(req, res) {
        const { id } = req.params

        const product = await ProductsModel.delete(id)

        if(product === undefined) return res.status(404).json({ message: "This product doesn't exist!" })

        res.status(200).json({ message: "Product deleted successfully!" })
    }
}

export default new ProductsController