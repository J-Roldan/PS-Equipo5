const User = require('../models/user.model')
const Role = require('../models/role.model')
var bcrypt = require("bcryptjs")

// Create a new user (normal client)
async function signup(request, reply) {
    try {
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
            gender
        })
        const role = await Role.findOne({ name: "user" })
        user.roles = [role._id]
        await user.save()
        const message = { message: "User saved successfully."}
        reply.status(200).send({ ...user._doc, ...message })
    } catch (error) {
        reply.status(500).send(error)
    }
}

async function logout (req, reply) {
	req.logout()
	return {success:true}
}

module.exports = {
	signup,
	logout
}