import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import prisma from '../prisma/client'


export const protect = async (req: Request, res: Response, next: NextFunction) => {
    let token
    if (req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer') &&
        process.env.JWT_SECRET
    ) {
        try {            
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            if (typeof decoded === 'string') {
                res.status(401).json({ message: 'Invalid token'})
            } else {
                const user = await prisma.user.findUnique({
                    where: {
                        email: decoded.id
                    }
                })
                if (!user) {
                    res.status(401).json({ message: 'USer not Authorized'})
                } else {
                    res.status(200)
                    req.user = user
                    next()
                }
            }
        } catch(error) {
            console.error(error)
            res.status(401).json({message: 'User not Authorized'})
        }
    }
    if (!token) {
        res.status(401).json({message: 'User not Authorized'})
    }
}