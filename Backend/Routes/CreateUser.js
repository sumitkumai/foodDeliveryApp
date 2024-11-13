import express from 'express';
import User from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const router = express.Router();

router.post("/createuser", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists",
                success: false
            });
        }

        const saltRounds = 10; // Defines the complexity of the hashing
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = await User.create({
            name: name,
            email: email,
            password: hashedPassword,
            date: Date.now()
        })

        const data = {user:{id:newUser.id}}

        const authToken = jwt.sign(data,process.env.JWT_SECRET)

        res.json({
            message: "user created successfully",
            success: true,
            authToken
        }).status(200)
        
    } catch (error) {
        res.json({
            message: error.message,
            success: false
        }).status(400)
    }
})

router.post("/loginuser", async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({
                message: "user not found",
                success: false
            }).status(404)
        }

        const isMatch = await bcrypt.compare(password,user.password);
        if (!isMatch) {
            return res.json({
                message: "invalid password",
                success: false
            }).status(400)
        }

        const data = {user:{id:user.id}}

        const authToken = jwt.sign(data,process.env.JWT_SECRET)

        res.json({
            message: "login successful",
            success: true,
            authToken
        }).status(200)

    } catch (error) {
        res.json({
            message: error.message,
            success: false
        }).status(400)
    }
})

export default router;