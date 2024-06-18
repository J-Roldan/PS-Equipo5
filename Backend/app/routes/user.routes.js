const userController = require('../controllers/user.controller')
const authenticate = require('../middleware/authenticate')

async function userRoutes(fastify, options) {
    fastify.addHook("onRequest", authenticate)

    fastify.get('/', userController.getUsers)
    fastify.get('/:id', userController.getUserById)
    fastify.post('/', userController.createUserEmployee)
    fastify.put('/:id', userController.updateUser)
    fastify.delete('/:id', userController.deleteUser)
    fastify.get('/search/:name', userController.searchUsers)
    fastify.post('/product', userController.addProductToUser)
    fastify.delete('/product', userController.removeProductFromUser)
    fastify.get('/product', userController.getUserByIdAndProducts)

}

module.exports = userRoutes