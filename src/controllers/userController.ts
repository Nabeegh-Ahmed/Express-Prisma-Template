import {Request, Response} from "express";
import prisma  from "../prisma/client";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken";

export const registerUser = async (req: Request, res: Response) => {
    const { firstName, lastName, email, password } = req.body;
    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    })
    if (user) {
        return res.status(400).json({
            message: "User already exists."
        })
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    try {
        // TODO: Add email validation
        const prismaResponse = await prisma.user.create({
            data: {
                firstName,
                lastName,
                email,
                password: hashedPassword
            }
        })
        res.status(201).json({
            id: prismaResponse.id,
            token: generateToken(email),
        })
    } catch (error) {
        console.log(error)
    }
}

export const loginUser = async (req: Request, res: Response) => {
    const {email, password} = req.body
    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    })
    if (!user) {
        return res.status(401).json({
            message: "Invalid credentials"
        })
    }
    const passwordMatch = await bcrypt.compare(password, user.password)
    if (passwordMatch) {
        res.json({
            id: user.id,
            token: generateToken(email),
        })
    } else {
        res.status(401).json({
            message: "Invalid credentials"
        })
    }
}