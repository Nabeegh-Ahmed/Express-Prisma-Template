import prisma from '../prisma/client'
import { Request, Response } from "express"

export const getRegisteredCourses = async (req: Request, res: Response) => {
    try {
        if (req.user) {
            const registeredCourses = await prisma.registration.findMany({
                where: {
                    userId: req.user.id
                },
                include: {
                    course: true
                }
            })
            res.status(200).json({ registrations: registeredCourses })
        } else {
            res.sendStatus(401)
        }
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
}