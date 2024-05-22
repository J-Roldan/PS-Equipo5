const productController = require('../controllers/product.controller')
const authenticate = require('../middleware/authenticate')
const fs = require('fs')
const path = require('path')
const fastifyMulter = require('fastify-multer')
const storage = fastifyMulter.diskStorage({
    destination: function (req, file, cb) {
        const filePath = `uploads/products`
        fs.mkdirSync(filePath, { recursive: true })
        cb(null, filePath)
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
const upload = fastifyMulter({ storage: storage })

async function productRoutes(fastify, options, done) {
    fastify.addHook("onRequest", authenticate)

    fastify.get('/', productController.getProducts)
    fastify.get('/:id', productController.getProductById)
    fastify.post('/', { preHandler: upload.single('photos') }, productController.createProduct)
    fastify.put('/:id', productController.updateProduct)
    fastify.delete('/:id', productController.deleteProduct)
    fastify.get('/search/:name', productController.searchProducts)

    done()
}

module.exports = productRoutes