import mongoose from "mongoose"
import dotenv from "dotenv"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

dotenv.config()

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const generateToken = (id) => {
    const token = jwt.sign({id}, process.env.SECRET, {expiresIn: "10d"})
    return token
}


userSchema.statics.register = async function (name, email, password) {
    const exists = await this.findOne({email})
    if (!exists) {
        const generateUser = await this.create({
            email,
            password: bcrypt.hashSync(password, 10),
            name
        })
        const token = generateToken(generateUser._id)
        const user = {
            user: generateUser,
            token
        }
        return {status: true, user}
    } else {
        return {status: false, message: "Email Already In Use"}
    }
}

userSchema.statics.login = async function (email, password) {
    const exists = await this.findOne({email})
    if (exists) {
        if (bcrypt.compareSync(password, exists.password)) {
            const token = generateToken(exists._id)
            const user = {
                user: exists,
                token
            }
            return {status: true, user}
        } else {
            return {status: false, message: "Invalid Password Inserted"}
        }
    } else {
        return {status: false, message: "Invalid Email Inserted"}
    }
}

const User = mongoose.model("User", userSchema)
export default User