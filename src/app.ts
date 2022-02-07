import express from 'express'
import cors from 'cors'

import dotenv from 'dotenv'
dotenv.config();

import { User } from '@prisma/client';

declare global {
    namespace Express {
        export interface Request {
            user: User | null
        }
    }
};

const app: express.Application = express()
app.use(express.json())
app.use(cors({
    origin: '*'
}));

import userRoutes from "./routes/userRoutes"
import courseRoutes from './routes/courseRoutes'
import requestRoutes from './routes/requestRoutes'
import registrationRoutes from './routes/registrationRoutes'

app.use('/api/user', userRoutes)
app.use('/api/course', courseRoutes)
app.use('/api/request', requestRoutes)
app.use('/api/registration', registrationRoutes)

console.log(`NODE_ENV: ${process.env.NODE_ENV}`)
if (process.env.NODE_ENV !== 'test') {
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`)
    })
}

export default app