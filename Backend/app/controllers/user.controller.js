const User = require('../models/user.model')
const Role = require('../models/role.model')
var bcrypt = require("bcryptjs")

// Get a list of users sorted by their name
async function getUsers(request, reply) {
    try {
        currentUser = await User.findById(request.manualUser.id).populate('roles', '-__v')
        if (currentUser.roles.some(obj => obj.name === "admin")) {
            const users = await User.find().sort({name: 1}).populate('roles')
            if (users.length === 0) {
                reply.status(200).send({ message: "No users found." })
                return
            }
            reply.status(200).send(users)
        } else {
            reply.status(403).send({ message: "You do not have permission to access this resource." })
        }
    } catch (error) {
        reply.status(500).send(error)
    }
}

// Get a single user by ID
async function getUserById(request, reply) {
    try {
        currentUser = await User.findById(request.manualUser.id).populate('roles', '-__v')
        if (currentUser.roles.some(obj => obj.name === "admin")) {
            const userId = request.params.id
            const user = await User.findById(userId).populate('roles')
            if (!user) {
                reply.status(404).send({ message: "User not found." })
                return
            }
            reply.status(200).send(user)
        } else {
            reply.status(403).send({ message: "You do not have permission to access this resource." })
        }
    } catch (error) {
        reply.status(500).send(error)
    }
}

// Create a new employee
async function createUserEmployee(request, reply) {
    try {
        currentUser = await User.findById(request.manualUser.id).populate('roles', '-__v')
        if (currentUser.roles.some(obj => obj.name === "admin")) {
            const { name, email, password, age, gender } = request.body
            if (!name || !email || !password || !age || !gender) {
                reply.status(400).send({ message: "Name, email, password, age, and gender are required fields." })
                return
            }
            const existingUserEmail = await User.findOne({ email })
            if (existingUserEmail) {
                reply.status(400).send({ message: "Email already exists." })
                return
            }
            const user = new User({
                name,
                email,
                password: bcrypt.hashSync(password, 8),
                age,
                gender,
            })
            const role = await Role.findOne({ name: "employee" })
            user.roles = [role]
            await user.save()
            const message = { message: "User saved successfully."}
            reply.status(200).send({ ...user._doc, ...message })
        } else {
            reply.status(403).send({ message: "You do not have permission to access this resource." })
        }
    } catch (error) {
        reply.status(500).send(error)
    }
}

// Update an existing user
async function updateUser(request, reply) {
    try {
        currentUser = await User.findById(request.manualUser.id).populate('roles', '-__v')
        if (currentUser.roles.some(obj => obj.name === "admin")) {
            const updates = request.body
            const userId = request.params.id
            const allowedFields = ['name', 'email', 'password', 'age', 'gender']
            const isValidUpdate = Object.keys(updates).every(field => allowedFields.includes(field))
            if (!isValidUpdate) {
                reply.status(400).send({ message: "Invalid fields for update." })
                return
            }
            const user = await User.findByIdAndUpdate(userId, updates)
            if (!user) {
                reply.status(404).send({ message: "User not found." })
                return
            }
            const userToUpdate = await User.findById(userId)
            const message = { message: "User updated succesfully." }
            reply.status(200).send({ ...userToUpdate._doc, ...message })
        } else {
            reply.status(403).send({ message: "You do not have permission to access this resource." })
        }
    } catch (error) {
        reply.status(500).send(error)
    }
}

// Delete an existing user
async function deleteUser(request, reply) {
    try {
        currentUser = await User.findById(request.manualUser.id).populate('roles', '-__v')
        if (currentUser.roles.some(obj => obj.name === "admin")) {
            const userId = request.params.id
            const user = await User.findByIdAndDelete(userId)
            if (!user) {
                reply.status(404).send({ message: "User not found." })
                return
            }
            reply.status(200).send({ message: "User deleted successfully." })
        } else {
            reply.status(403).send({ message: "You do not have permission to access this resource." })
        }
    } catch (error) {
        reply.status(500).send(error)
    }
}

// Get a list of users that contain the name/email/rut searched
async function searchUsers(request, reply) {
    try {
        currentUser = await User.findById(request.manualUser.id).populate('roles', '-__v')
        if (currentUser.roles.some(obj => obj.name === "admin")) {
            var nameRegex = {"$regex": new RegExp('^' + request.params.name.toLowerCase(),  'i')}
            const users = await User.find({$or: [
                { name: nameRegex },
                { email: nameRegex },
                { rut: nameRegex }
            ]}).populate('roles')
            if (users.length === 0) {
                reply.status(200).send({ message: "No users found." })
                return
            }
            reply.status(200).send(users)
        } else {
            reply.status(403).send({ message: "You do not have permission to access this resource." })
        }
    } catch (error) {
        reply.status(500).send(error)
    }
}

module.exports = {
    getUsers,
    getUserById,
    createUserEmployee,
    updateUser,
    deleteUser,
    searchUsers
}