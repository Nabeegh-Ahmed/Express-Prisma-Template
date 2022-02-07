import prisma from '../prisma/client'
import { Request, Response } from "express"

export const createCourse = async (req: Request, res: Response) => {
    const { name, description, genre, price, startingDate, endingDate, cover} = req.body
    try {
        if (req.user) {
            const newCourse = await prisma.course.create({
                data: {
                    name,
                    description,
                    genre,
                    price,
                    startingDate,
                    endingDate,
                    cover,
                    rating: 0,
                    totalMarks: 0,
                    teacherId: req.user.id                
                }
            })
            return res.status(201).json({ courseId: newCourse.id })
        }
        return res.sendStatus(401)
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: 'Error in creating the course '})
    }
}

export const getCourse = async(req: Request, res: Response) => {
    try {
        const course = await prisma.course.findUnique({
            where: {
                id: Number(req.params.id)
            }
        })
        if (course) {
            res.status(200).json({ course })
        } else {
            res.sendStatus(404)
        }
    } catch (error) {
        console.log(error)
        res.sendStatus(400)
    }
}

export const searchCourse = async (req: Request, res: Response) => {
    try {
        if (typeof req.query.search === 'string') {
            const searchedCoruses = await prisma.course.findMany({
                where: {
                    name: {
                        contains: req.query.search
                    }
                },
                skip: Number(req.query.skip) ? Number(req.query.skip) : 0,
                take: Number(req.query.take) ? Number(req.query.take) : 10 
            })
            res.status(200).json({ courses: searchedCoruses })
        } else {
            res.sendStatus(400)
        }
    } catch (error) { 
        console.log(error)
        res.sendStatus(400)
    }
}