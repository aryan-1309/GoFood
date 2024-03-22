const UserModel = require('../models/UserModels')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const registerController = async (req, res) => {
    try {
        const existingUser = await UserModel.findOne({ email: req.body.email })
        if (existingUser) {
            return res.status(200).send({ success: false, message: `User Already Exist` })
        }

        const password = req.body.password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        req.body.password = hashedPassword

        const newUser = new UserModel(req.body)
        await newUser.save()

        res.status(201).send({ success: true, message: `Register Successfully` })
    } catch (error) {
        console.log(error)
        res.status(500).send({ success: false, message: `Register Controller ${error.message}` })
    }
}

const loginController = async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email })
        if (!user) {
            return res.status(200).send({ success: false, message: `User Not Found` })
        }

        const isMatch = await bcrypt.compare(req.body.password, user.password)
        if (!isMatch) {
            return res.status(200).send({ success: false, message: `Invalid Email or Password` })
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })
        res.status(200).send({ success: true, message: `Login Successfully`, token: token})
    } catch (error) {
        console.log(error)
        res.status(500).send({ success: false, message: `Login Controller ${error.message}` })
    }
}

const authController = async (req, res) => {
    try {
        const user = await UserModel.findOne({_id: req.body.userId})

        if(!user){
            return res.status(200).send({success: false, message: `User Not Found`})
        }
        else{
            res.status(200).send({success: true, data:{name: user.name, email: user.email}})
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({success: false, message: `Something went wrong while AuthController`})
    }
}

module.exports = { registerController, loginController, authController }