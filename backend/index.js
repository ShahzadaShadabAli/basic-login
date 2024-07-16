import express from "express"
import User from "./userModel.js"
import mongoose from "mongoose"
import dotenv from "dotenv"

const app = express()
app.use(express.json())
app.use(cors({
    origin: "https://basic-login-sigma.vercel.app/",
    methods: ["POST", "GET", "DELETE"],
    credentials: true
}))

dotenv.config()

const connectDB = async (req, res) => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_DB)
        if (conn) {
            console.log("Connection Established Successfully")
        }
    } catch (error) {
        console.log(error)
    }
}

connectDB()

app.get('/', (req, res) => {
    res.send("Hello Hell")
})

app.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body
    const response = await User.login(email, password)
    res.status(200).json(response)
    } catch (error) {
        res.status(400).json(error.message)
    }
})

app.post('/register', async (req, res) => {
    try {
        const {name, email, password} = req.body
        const response = await User.register(name, email, password)
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json(error.message)
    }
})

app.listen(5000, console.log("Port running at 5000"))
