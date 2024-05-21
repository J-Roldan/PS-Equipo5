const Product = require('../models/product.model')
const Image = require('../models/image.model').image
const User = require('../models/user.model')

// Get a list of products sorted by their name
async function getProducts(request, reply) {
    try {
        currentUser = await User.findById(request.manualUser.id).populate('roles', '-__v')
        if (currentUser.roles.some(obj => obj.name === "user" || obj.name === "employee")) {
            const products = await Product.find().sort({name: 1}).populate('images')
            if (products.length === 0) {
                reply.status(200).send({ message: "No products found." })
                return
            }
            reply.status(200).send(products)
        } else {
            reply.status(403).send({ message: "You do not have permission to access this resource." })
        }
    } catch (error) {
        reply.status(500).send(error)
    }
}

// Get a single product by ID
async function getProductById(request, reply) {
    try {
        currentUser = await User.findById(request.manualUser.id).populate('roles', '-__v')
        if (currentUser.roles.some(obj => obj.name === "user" || obj.name === "employee")) {
            const productId = request.params.id
            const product = await Product.findById(productId).populate('images')
            if (!product) {
                reply.status(404).send({ message: "Product not found." })
                return
            }
            reply.status(200).send(product)
        } else {
            reply.status(403).send({ message: "You do not have permission to access this resource." })
        }
    } catch (error) {
        reply.status(500).send(error)
    }
}

// Create a new product
async function createProduct(request, reply) {
    try {
        currentUser = await User.findById(request.manualUser.id).populate('roles', '-__v')
        if (currentUser.roles.some(obj => obj.name === "employee")) {
            const { name, description, type, material, size, gender, color, brand, quantity, costPrice, salePrice } = request.body
            if (!name || !description || !type || !material || !size || !gender || !color || !brand || !quantity || !costPrice || !salePrice || !request.file) {
                reply.status(400).send({ message: "Name, description, type, material, size, gender, color, brand, quantity, costPrice, salePrice, and photos are required fields." })
                return
            }
            const existingProductName = await Product.findOne({ name })
            if (existingProductName) {
                reply.status(400).send({ message: "Name already exists." })
                return
            }
            const image = new Image({
                filename: request.file.filename,
                originalname: request.file.originalname,
                path: request.file.path,
                uploadedAt: new Date()
            })
            await image.save()
            const product = new Product({
                name,
                description,
                type,
                material,
                size,
                gender,
                color,
                brand,
                quantity,
                costPrice,
                salePrice
            })
            product.images = [image]
            await product.save()
            const message = { message: "Product and image saved successfully."}
            reply.status(200).send({ ...product._doc, ...message })
        } else {
            reply.status(403).send({ message: "You do not have permission to access this resource." })
        }
    } catch (error) {
        reply.status(500).send(error)
    }
}

// Update an existing product
async function updateProduct(request, reply) {
    try {
        currentUser = await User.findById(request.manualUser.id).populate('roles', '-__v')
        if (currentUser.roles.some(obj => obj.name === "employee")) {
            const updates = request.body
            const productId = request.params.id
            const allowedFields = ['name', 'description', 'type', 'material', 'size', 'gender', 'color', 'brand', 'quantity', 'costPrice', 'salePrice']
            const isValidUpdate = Object.keys(updates).every(field => allowedFields.includes(field))
            if (!isValidUpdate) {
                reply.status(400).send({ message: "Invalid fields for update." })
                return
            }
            const product = await Product.findByIdAndUpdate(productId, updates)
            if (!product) {
                reply.status(404).send({ message: "Product not found." })
                return
            }
            const productToUpdate = await Product.findById(productId)
            const message = { message: "Product updated succesfully." }
            reply.status(200).send({ ...productToUpdate._doc, ...message })
        } else {
            reply.status(403).send({ message: "You do not have permission to access this resource." })
        }
    } catch (error) {
        reply.status(500).send(error)
    }
}

// Delete an existing product
async function deleteProduct(request, reply) {
    try {
        currentUser = await User.findById(request.manualUser.id).populate('roles', '-__v')
        if (currentUser.roles.some(obj => obj.name === "employee")) {
            const productId = request.params.id
            const product = await Product.findByIdAndDelete(productId)
            if (!product) {
                reply.status(404).send({ message: "Product not found." })
                return
            }
            const image = await Image.findByIdAndDelete(product.images[0])
            reply.status(200).send({ message: "Product deleted successfully." })
        } else {
            reply.status(403).send({ message: "You do not have permission to access this resource." })
        }
    } catch (error) {
        reply.status(500).send(error)
    }
}

// Get a list of products that contain the name/material/color/brand searched
async function searchProducts(request, reply) {
    try {
        currentUser = await User.findById(request.manualUser.id).populate('roles', '-__v')
        if (currentUser.roles.some(obj => obj.name === "user" || obj.name === "employee")) {
            var nameRegex = {"$regex": new RegExp('^' + request.params.name.toLowerCase(),  'i')}
            const products = await Product.find({$or: [
                { name: nameRegex },
                { material: nameRegex },
                { color: nameRegex },
                { brand: nameRegex }
            ]}).populate('images')
            if (products.length === 0) {
                reply.status(200).send({ message: "No products found." })
                return
            }
            reply.status(200).send(products)
        } else {
            reply.status(403).send({ message: "You do not have permission to access this resource." })
        }
    } catch (error) {
        reply.status(500).send(error)
    }
}

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    searchProducts
}