const userController = require('../controllers/user.controller')
const authenticate = require('../middleware/authenticate')

async function userRoutes(fastify, options, done) {
    fastify.addHook("onRequest", authenticate)

    fastify.get('/', userController.getUsers)
    fastify.get('/:id', userController.getUserById)
    fastify.post('/', userController.createUserEmployee)
    fastify.put('/:id', userController.updateUser)
    fastify.delete('/:id', userController.deleteUser)
    fastify.get('/search/:name', userController.searchUsers)

    done()
}

module.exports = userRoutes