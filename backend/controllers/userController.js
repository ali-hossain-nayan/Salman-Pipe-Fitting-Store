
import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'

//login user function
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email })

        if (!user) {
            return res.json({ success: false, message: "User doesn't exist.." })
        }
        //matching password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials!!" })
        }

        const token = createToken(user._id);
        res.json({ success: true, token })


    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Something went wrong!!" })
    }
}

//token create
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

//Register user function
const registerUser = async (req, res) => {

    const { name, password, email } = req.body;

    try {


        //check email exist
        const userExist = await userModel.findOne({ email });
        if (userExist) {
            return res.json({ success: false, message: 'User already exists!!' })
        }


        //check email validity using validator
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email address!!" })
        }


        //checking strong password with length
        if (password.length < 8) {
            return res.json({ success: false, message: 'Please enter a strong password!!' })
        }

        //encrypt the password using bcrypt
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);



        //after checking all aditional checking, create new user
        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword
        })
        const user = await newUser.save()
        const token = createToken(user._id)
        res.json({ success: true, token })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Something went wrong!! " })
    }
}

export { loginUser, registerUser }