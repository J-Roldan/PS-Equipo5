const fastify = require('fastify')()//{ logger: true })
const fastifyEnv = require('@fastify/env')
const fastifyCors = require('@fastify/cors')
const mongoose = require('mongoose')
const dotenv = require("dotenv")
const dotenvExpand = require("dotenv-expand")
const Role = require('./app/models/role.model')
const User = require('./app/models/user.model')
var bcrypt = require("bcryptjs")

// Load environment variables if needed
var myEnv = dotenv.config()
dotenvExpand.expand(myEnv)

// Define the schema for environment variables
const envOptions = {
    confKey: 'config',
    schema: {
        type: 'object',
        required: ['HOST', 'PORT', 'MONGODB_URI', 'JWT_SECRET', 'JWT_EXPIRATION', 'JWT_REFRESH_EXPIRATION', 'FRONT_URL_CORS', 'ADMIN_USER_NAME', 'ADMIN_USER_EMAIL', 'ADMIN_USER_PASSWORD'],
        properties: {
            HOST: { type: 'string'},
            PORT: { type: 'number' },
            MONGODB_URI: { type: 'string' },
            JWT_SECRET: { type: 'string' },
            JWT_EXPIRATION: { type: 'string' },
            JWT_REFRESH_EXPIRATION: { type: 'number' },
            FRONT_URL_CORS: { type: 'string' },
            ADMIN_USER_NAME: { type: 'string' },
            ADMIN_USER_EMAIL: { type: 'string' },
            ADMIN_USER_PASSWORD: { type: 'string' }
        }
    },
    dotenv: true
}
  
// Register the fastify-env plugin
fastify.register(fastifyEnv, envOptions)

// Configure the db with mongoose
mongoose
.connect(process.env.MONGODB_URI, {})
.then(() => {
    initializeRoles()
    initializeAdminUser()
    console.log('Connected to MongoDB')
})
.catch((err) => console.error(err));

// Configure fastify-cors
fastify.register(fastifyCors, {
    origin: process.env.FRONT_URL_CORS.split(" "), // Set the allowed origin(s) or use '*' to allow all origins
})

// Simple route
fastify.get("/", async function (req, reply) {
    if(req.user) {
        const user = await User.findOne({ email: req.user.email }).populate("roles", "-__v")
        reply.send({ message: `Welcome to the backend ${req.user.name} & ${req.user.email}. ${user.roles[0].name}` })
    } else
        reply.send({ message: `Welcome to the backend.` })
})
// Routes
//fastify.register(userRoutes, { prefix: '/api/users' })

// Set host and port, listen for requests
fastify.listen({host: process.env.HOST, port: process.env.PORT}, (err) => {
    if (err) throw err
    console.log(`Server is running on host ${process.env.HOST} and port ${process.env.PORT}.`)
})

// Functions
async function initializeRoles() {
    try {
        const roles = await Role.find()
        if (roles.length === 0) {
            await Role.insertMany([
                { name: 'user' },
                { name: 'employee' },
                { name: 'admin' }
            ]);
            console.log('Roles initialized')
        }
    } catch (error) {
        console.error('Error initializing roles:', error)
    }
}

// Functions
async function initializeAdminUser() {
    try {
        const adminUser = await User.findOne({name: process.env.ADMIN_USER_NAME})
        if (!adminUser) {
            const adminRole = await Role.findOne({name: 'admin'})
            await User.insertMany([{
                name: process.env.ADMIN_USER_NAME,
                email: process.env.ADMIN_USER_EMAIL,
                password: bcrypt.hashSync(process.env.ADMIN_USER_PASSWORD, 8),
                roles: [adminRole]
            }]);
            console.log('Admin user initialized')
        }
    } catch (error) {
        console.error('Error initializing admin user:', error)
    }
}